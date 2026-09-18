# Reflective Practice Tool

A small static site that helps university students write a structured reflection. The student selects a reflective model, answers the stages in order, then copies a formatted version of their own writing.

The tool does not rewrite, summarise, complete or improve student text. It only structures what the student typed.

The four initial models (ERA, Driscoll, Kolb, Gibbs) are derived from the University of Cambridge Reflective Practice Toolkit: [Models of reflection](https://libguides.cam.ac.uk/reflectivepracticetoolkit/models).

## Privacy

Responses are not saved. There is no account, database, or browser storage. Closing or refreshing the page removes the work. That is intended.

## Files

```
index.html
styles.css
app.js
.nojekyll
README.md
images/
  era.png
  driscoll.png
  kolb.png
  gibbs.png
```

There is no build step, bundler, or package manager.

## Run locally

Open `index.html` in a browser, or serve the repository root with any static file server.

## GitHub Pages

1. Make sure these files are on the `main` branch at the repository root.
2. In the GitHub repository: **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Set the branch to `main` and the folder to `/` (root).
5. Save. The site will be published at `https://<account>.github.io/reflective-cycles-uwtsd/`.

No GitHub Actions workflow is required.

## Adding or editing a reflective model

Edit the `MODELS` object at the top of `app.js`. The rest of the application reads that data and does not need to change.

Each model needs:

- `name`
- `description`
- `diagram`, including its image path, alt text, figure number, caption, and citation
- `stages`, each with a `title` and one or more `prompts`

Keep academic wording as close paraphrases of the source used for that model. Do not invent extra pedagogical questions.
