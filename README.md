# DealEngine API Developer Portal — Updated Guide

Static developer documentation for the **updated DealEngine Developer Guide** provided on November 12, 2026. Designed as a Freshworks-style developer portal, but with DealEngine-specific branding and content.

### What is included

- **28 documented REST operations**, indexed as independent API reference pages.
- **17 documented webhook events**, signature verification, and delivery semantics.
- Getting started, API keys and record scope, write bodies, CRM migration, filtering, pagination, conventions, errors, rate limits, idempotency and more.
- Full original supplied guide available at `source/DealEngine-Developer-Guide.txt`.
- Search (`Ctrl+K`, `Cmd+K`, `/`), quick method navigation, copy buttons, request examples in cURL / Node.js / C#, responsive layout, light/dark theme.
- No runtime dependencies, backend, API calls, build step or API key required to view the docs.

**Source of truth:** The included plain text guide. This project documents endpoints from that guide **only**. It does not create or use new API endpoints.

### Run locally

Open `index.html` directly, or start a local static server:

```bash
python -m http.server 8080
```

Visit <http://localhost:8080>.

### Deploy to your existing Vercel + GitHub project

Repository: <https://github.com/amirsaber07/dealengineAPIGuide>  
Existing Vercel project: `dealengine-api-docs`

1. **Extract the ZIP**, then copy its *contents* into the root of the GitHub repository (so `index.html` is at repo root, not nested under another folder).
2. Commit and push to the branch configured as **Production Branch** in Vercel (`main`, unless your project settings say otherwise).
3. Vercel should build/deploy it automatically through the existing Git connection. For static hosting, set **Framework Preset = Other**, **Root Directory = `./`**, and **Build Command / Output Directory = default or empty**.
4. Open the production deployment URL in Vercel and verify the home page, a deep link such as `?doc=ep-list-deals`, and search.

**PowerShell example** (run in the repository working directory, after copying files):

```powershell
git add .
git commit -m "Update DealEngine API developer portal for 28 endpoints"
git push origin main
```

Alternatively, deploy this directory from a linked checkout using `npx vercel --prod`.

### Project layout

```text
index.html                            App shell (static)
assets/app.js                         Navigation, views, search, example generator
assets/data.js                        Generated reference data from supplied guide
assets/styles.css                     Responsive portal design
assets/favicon.svg                    Self-contained favicon
source/DealEngine-Developer-Guide.txt Full original updated guide
vercel.json                           Static-site config and security headers
tests/smoke.mjs                       Dependency-free content and file checks
```

### Update the guide later

Update the structured data in `assets/data.js` and the accompanying guide copy in `source/`. Keep the endpoint table and guide contract aligned. Do not infer routes or permissions that are not in the supplied guide. An internal source-to-data generation script was used to extract the endpoint, event, error and filter tables.

### Important constraints from the updated guide

- All resource reads are limited by the key's record scope.
- Marketing leads require Marketing enabled; account feedback/touches require Account management enabled; reports require `reports.view`.
- Invoice/payment **old REST endpoints return `410 Gone`**; do not add them to the API endpoint list, even though webhook events still exist.
- No standalone contact creation endpoint is listed in the current guide; the migration prose discusses importing the remaining people but this guide does not establish such a path.
- The Transparent result callback does not define its request body shape; this site intentionally avoids inventing it.
- No credentials are stored or requested by this documentation site. Sample code reads keys from environment variables rather than embedding them in client-side JavaScript.

### QA

```bash
node tests/smoke.mjs
```

No package install is required for the shipped portal or content tests.
