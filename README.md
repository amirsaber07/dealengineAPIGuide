# DealEngine API Developer Portal

A responsive, static documentation portal built from the supplied DealEngine Developer API Guide.

## Run locally

No build tools or package installation are required. Open `index.html` in a browser, or serve this directory with any static HTTP server.

For example, with Python:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy

This is a static website. It can be hosted on IIS, GitHub Pages, Netlify, Vercel, or any HTTPS static hosting provider. No API key or backend is required to render the documentation.

For IIS, copy the contents of this folder into the site's web root. The included `web.config` provides basic static-file MIME and cache settings.

## Source of truth

The content is based on the supplied DealEngine Developer API Guide. Undocumented endpoints and behaviours have intentionally not been added.

## Deploy to Vercel

This project has no build step. From this directory, run:

```bash
npx vercel --prod
```

If prompted, sign in to Vercel, choose or create a project, and keep the project root as this directory. Vercel serves `index.html` as the site entry point.
