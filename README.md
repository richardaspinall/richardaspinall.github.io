# Portfolio website

> Date started (Dec 2020)

https://richardaspinall.github.io/

## Description

A portfolio website to showcase projects and write blog posts

## Goals

- A base for my any projects I create
- A "profile" for myself that I can tell my story from
- Track progress of learnings

## Requirements

- Node (for projects to be pulled in prebuild)
- Ruby and Jekyll (gem) see: https://jekyllrb.com/docs/installation/macos/
    - https://stackoverflow.com/questions/51126403/you-dont-have-write-permissions-for-the-library-ruby-gems-2-3-0-directory-ma
    - https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/?utm_source=stackoverflow

### Development

- Live Server (VSCode extension) running on `_static` build for instant refresh
- `bundle exec jekyll serve` to build to `_site` on save
- `bundle exec jekyll serve --drafts` to build with draft blog posts
- `jekyll build` to build to `_site`
- `source ./loadenv.sh && ./get-github-repos.sh` to create project data from `prebuild_scripts`
- `_plugins/tag_category_generator.rb` – to generate tags and categories. Uncomment script when wanting to run (infinite loop otherwise)

### Production

- A push to main branch will automatically build `_site` to gh-pages via the Github actions workflow

## Resources

- https://jekyllrb.com/
- https://learn.cloudcannon.com/
