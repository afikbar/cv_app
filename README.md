# CV App

Static CV / resume site deployed on GitHub Pages.

## How it works

All content is driven by a single **`data.json`** file. The page loads it at runtime and renders every section with vanilla JavaScript — no build step, no framework.

```
data.json  →  js/app.js (fetch + render)  →  index.html
```

## Editing your CV

Open `data.json` and edit any section:

- **experience** — add/remove objects in the `experience` array
- **education** — add/remove objects in the `education` array
- **skills** — each inner array is a table row; items are columns
- **contact** — email, phone, GitHub, LinkedIn, CV file link
- **about** — the short bio text

Commit and push — GitHub Actions deploys automatically.

## Local development

Serve the repo root with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

Then open `http://localhost:3000` (or `:8000` for Python).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) deploys to GitHub Pages on every push to `master`. The `CNAME` file configures the custom domain.

## File structure

```
├── index.html           # HTML shell
├── data.json            # All CV content (edit this)
├── css/style.css        # Styles
├── js/app.js            # Rendering logic
├── assets/
│   ├── favicon.ico
│   └── files/           # Downloadable files (CV PDF, etc.)
├── robots.txt
├── sitemap.xml
├── CNAME
└── .github/workflows/deploy.yml
```
