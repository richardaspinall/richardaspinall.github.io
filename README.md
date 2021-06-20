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
- Ruby and Jekyll (gem) see: https://jekyllrb.com/docs/installation/

### Development

- Live Server (VSCode extension) running on `_static` build for instant refresh
- `jekyll serve` to build to `_site` on save
- `jekyll serve --drafts` to build with draft blog posts
- `jekyll build` to build to `_site`

### Production

- A push to main branch will automatically build `_site` to gh-pages via the Github actions workflow

## Resources

- https://jekyllrb.com/
- https://learn.cloudcannon.com/
