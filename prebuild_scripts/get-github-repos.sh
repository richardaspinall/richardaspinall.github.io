#!/bin/bash
# See https://github.com/richardaspinall/get-github-projects/blob/Main/readme.md

user=richardaspinall
# The repo names of the projects we want to add to our website
repos_to_add=('get-github-repos' 'vue-todolist' 'tinyurl-generator' 'remote-file-unfurler' 'timezone-converter' 'slack-api-feature-breakdowns' 'ping-pong')

# Get all repos for given user
all_repos=$(curl -s \
-H "Accept: application/vnd.github.v3+json" \
-H "User-Agent: ${user}.github.io" \
"https://api.github.com/users/${user}/repos")

# Building the output
projects="["

# Loop through each repo we want to add and create our projects
for repo_name in ${repos_to_add[@]}; do 
	
	# `jq` is a command-line JSON processor
	#
	# `$()` means to run whatever is inside in a subshell
	#
	# `<<<` is a "here string" and supplies the input from the right 
	# to the command on the left 
	repo=$( jq -r '.[] | select(.name == '\"$repo_name\"')' <<< $all_repos)
	
	# Call Github's GQL to get image url
	# A lot of escaping as quotes and backslashes need to be sent in the query
	image=$(jq '.data.repository.openGraphImageUrl' <<< $(curl -s \
	-X POST \
	-H "Authorization: bearer ${GRAPHQL_GITHUB_TOKEN}" \
	-d "{\"query\":\"query {repository(owner: \\\"${user}\\\", name: \\\"${repo_name}\\\") {openGraphImageUrl}}\"}" \
	"https://api.github.com/graphql"))

	# An avatar returned means that there isn't an image set for the project in Github
	if [[ $image =~ "avatars.githubusercontent.com" ]];
	then 
		image="\"\""
	fi

	# Topics for each project
	topics=$(curl -s \
	-H "Accept: application/vnd.github.mercy-preview+json" \
	-H "User-Agent: ${user}.github.io" \
	"https://api.github.com/repos/${user}/${repo_name}/topics")

	# Get each field we want from the repo and add each project to an array
	
	projects+=$(jq "{
		name: .name, 
		description: .description,
		homepage: .homepage,
		githubUrl: .html_url,
		readme: (.html_url + \"/blob/main/README.md\"),
		image: ${image},
		topics: ${topics}	
    }" <<< "$repo"),
done

# Close the array
projects+="]"

# Output the projects into
echo "$projects" > "../_data/project-data.json"