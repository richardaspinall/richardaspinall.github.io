require('dotenv').config();

const https = require('https');
const fs = require('fs');

const user = 'richardaspinall';
// From: https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql
const GRAPHQL_GITHUB_TOKEN = process.env.GRAPHQL_GITHUB_TOKEN;
const projectsToAdd = [
  {
    name: 'coursera-fe-ui-frameworks',
  },
  {
    name: 'css-pingpong',
  },
  {
    name: 'slack-api-feature-breakdowns',
  },
  {
    name: 'chrome-timezone-converter',
  },
  {
    name: 'vuejs-todolist',
  },
];

async function sendGraphQLRequest(repoName) {
  const gqlString = JSON.stringify({
    query: `query {repository(owner: "${user}", name: "${repoName}") {openGraphImageUrl}}`,
  });

  const options = {
    hostname: 'api.github.com',
    path: '/graphql',
    headers: {
      'user-agent': 'node.js',
      Authorization: `bearer ${GRAPHQL_GITHUB_TOKEN}`,
      'Content-Length': Buffer.byteLength(gqlString),
    },
    method: 'POST',
  };

  let p = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        const imageJSON = JSON.parse(responseBody);
        resolve(imageJSON.data.repository.openGraphImageUrl);
      });
    });

    req.on('error', (err) => {
      reject(err);
      console.log(err);
    });

    req.end(gqlString);
  });
  return await p;
}

async function sendRequest(options) {
  let p = new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseBody));
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });

  return await p;
}

function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i];
    }
  }
}

async function getProjectsFromGithub() {
  const options = {
    hostname: 'api.github.com',
    path: `/users/${user}/repos`,
    headers: {
      'User-Agent': `${user}.github.io`,
      Accept: 'application/vnd.github.v3+json',
    },
    method: 'GET',
  };
  const allRepos = await sendRequest(options);
  let projectsToWrite = [];

  for (let index = 0; index < projectsToAdd.length; index++) {
    const projectToAdd = search(projectsToAdd[index].name, allRepos);
    options.path = `/repos/${user}/${projectToAdd.name}/topics`;
    options.headers.Accept = 'application/vnd.github.mercy-preview+json';
    const topics = await sendRequest(options);
    const image = await sendGraphQLRequest(projectToAdd.name);
    const project = {
      name: projectToAdd.name,
      description: projectToAdd.description,
      githubUrl: projectToAdd.html_url,
      readme: projectToAdd.html_url + '/blob/main/README.md',
      homepage: projectToAdd.homepage,
      topics: topics,
    };

    if (image) {
      project.image = image;
    }

    projectsToWrite.push(project);
  }

  fs.writeFile(
    '../_data/project-data.json',
    JSON.stringify(projectsToWrite),
    function (err) {
      if (err) throw err;
      console.log('Replaced!');
    }
  );
}

getProjectsFromGithub();
