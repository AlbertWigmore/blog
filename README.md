# Blog

A repository containing a personal for writing about hobbies or technical projects.

- **Post** - A long format post containing more information and discussion around the topic, intended to be less frequent.
- **TIL** - Today I Learned, short format small thing that I have learnt that day that was useful.

## Developer Guide

Developers guide for getting started with the codebase and how to contribute changes.

**Quick Start**

```bash
# Linting with NextJS
npm run lint

# Run Locally and open on localhost:3000
npm run dev

# Build NextJS application with npm
npm run build

# Docker container build
docker build . -t blog

# Save Docker container for manual upload
docker save -o blog.tar blog
```

## Deployment (WIP)

Currently the deployment process is 100% manual and will update it to be automated in future if I actually write content for this blog.

- Build a docker image
- Upload the docker image to the server manually via SSH
- Start the server with new docker image
- Curl on localhost to confirm the container is accepting traffic
