const https = require('https');
const fs = require('fs');

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

async function getProjectDataFromGithub() {
  const allRepoOptions = {
    hostname: 'api.github.com',
    path: '/users/richardaspinall/repos',
    headers: {
      'User-Agent': 'richardaspinall.github.io',
      Accept: 'application/vnd.github.v3+json',
    },
    method: 'GET',
  };

  const repoOptions = {
    hostname: 'api.github.com',
    path: '/repos/richardaspinall/richardaspinall.github.io',
    headers: {
      'User-Agent': 'richardaspinall.github.io',
      Accept: 'application/vnd.github.v3+json',
    },
    method: 'GET',
  };

  const topicOptions = {
    hostname: 'api.github.com',
    path: '/repos/richardaspinall/richardaspinall.github.io/topics',
    headers: {
      'User-Agent': 'richardaspinall.github.io',
      Accept: 'application/vnd.github.mercy-preview+json',
    },
    method: 'GET',
  };

  let allRepos = await sendRequest(allRepoOptions);

  let projects = [];
  for (let index = 0; index < allRepos.length; index++) {
    topicOptions.path = `/repos/richardaspinall/${allRepos[index].name}/topics`;
    const topics = await sendRequest(topicOptions);
    const project = {
      name: allRepos[index].name,
      description: allRepos[index].description,
      githubUrl: allRepos[index].html_url,
      readme: allRepos[index].html_url + '/blob/main/README.md',
      homepage: allRepos[index].homepage,
      topics: topics,
    };
    if (topics.names.includes('test')) {
      console.log(`Not adding test project: ${project.name}`);
    } else {
      projects.push(project);
    }
  }

  fs.writeFile('../_data/project-data.json', JSON.stringify(projects), function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
}

getProjectDataFromGithub();
