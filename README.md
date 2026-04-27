# NTCIR-19 ModelRetrieval

This repository contains the documentation site and task specification for the NTCIR-19 "ModelRetrieval" benchmark. The site is built with MkDocs and the `mkdocs-material` theme.

Quick links

- Docs source: `docs/`
- Site config: `mkdocs.yml`
- Local entry (not required for docs): `main.py`

Quick start

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install the documentation toolchain:

```bash
pip install mkdocs mkdocs-material pymdown-extensions
```

3. Serve locally and edit Markdown files under `docs/`:

```bash
mkdocs serve
```

4. Build the static site:

```bash
mkdocs build
```

Deployment

- This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` which runs `mkdocs build` and deploys the generated `site/` directory to the `gh-pages` branch on pushes to `master`.
- To publish manually: run `mkdocs gh-deploy` after installing `mkdocs` and `mkdocs-material`.

Repository layout

- `docs/` — Markdown source for the site (canonical).
- `docs/assets/images/` — images used by the docs.
- `docs/stylesheets/extra.css` — custom CSS referenced by `mkdocs.yml`.
- `docs/javascripts/mathjax.js` — mathjax config used for math support.
- `.github/workflows/deploy.yml` — CI workflow that builds/deploys the site.

Contributing

- Edit Markdown files in `docs/` and preview locally with `mkdocs serve`.
- Add new top-level pages by adding the file to `docs/` and adding an entry under `nav:` in `mkdocs.yml`.

If you need a CI change (preview builds, custom domain/CNAME support), tell me how you'd like it configured and I can add or update the workflow.
