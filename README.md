# Blog

This is a simple NextJS app for serving static markdown files for a blog about things I find interesting.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Docker

Build the image
```bash
docker build -t blog:latest .
```

Run the container
```bash
docker run -d --name blog -p 3000:3000 blog:latest
```
