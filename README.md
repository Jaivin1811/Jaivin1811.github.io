# Jaivin · Industrial Engineer Portfolio

A static site (plain HTML, CSS, JavaScript; no build step, no frameworks) designed as an **engineering drawing sheet**: numbered sheets, a title block, dimension lines, a revision table, and a hero where a touch probe measures a flanged plate (a nod to the master's thesis on workpiece probe accuracy). Light mode is drafting paper, dark mode is ink on graphite. Fonts are self-hosted, so there are no third-party requests.

## Structure

```
index.html            page shell, SEO metadata, structured data
data/site.js          ALL your content. Edit this for almost every update
assets/css/styles.css design system (colours are variables at the top)
assets/js/main.js     renders sections from site.js, interactions
assets/js/probe.js    hero probe demo
assets/js/diagrams.js project card illustrations
assets/img/           favicon.svg, og.png (link preview image), project images
assets/cv/            put your CV PDF here
404.html robots.txt sitemap.xml .nojekyll
```

## 1. Fill in your details

Open `data/site.js` and search for `TODO` / empty `""` fields:

- `site`: email, LinkedIn, GitHub, CV path (`assets/cv/Jaivin-CV.pdf`, then add the PDF), optional `formEndpoint`.
- `period` on each role and degree (leave `""` to hide). Diploma institution, B.Eng. highlights.
- **Thesis**: replace the placeholder `implementation` and `results` once you have them.
- Project `links` (Tableau Public, GitHub). Links with an empty `href` are hidden.
- **Add what is missing**: awards, workshops and recognitions. The journey table (`journey`) is the place to add them as new revisions.
- In `index.html`: replace `your-username` in the canonical URL, `og:` tags; update `robots.txt` and `sitemap.xml`.

Be honest in skills and claims: everything marked `applied` should be something you can discuss in an interview.

## 2. Preview locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

## 3. Deploy on GitHub Pages

1. Create a repository called `YOUR-USERNAME.github.io` (gives the root URL) and push these files:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
   git push -u origin main
   ```
2. Repository **Settings → Pages → Build and deployment**: Source *Deploy from a branch*, Branch `main`, folder `/ (root)`. Save.
3. After about a minute the site is live at `https://YOUR-USERNAME.github.io`.
4. Using another repo name? The site lives at `/REPO-NAME/`; update the canonical URL and the 404 link.
5. Optional: custom domain under Settings → Pages. Submit `sitemap.xml` in Google Search Console.

## 4. Add a new project

In `data/site.js`, copy any object in `projects`, paste it at the top, change `id`, and fill in the fields. Empty fields are hidden and filter buttons are generated from `type`.

```js
{
  id: "my-new-project", type: "Analytics", status: "In progress",
  title: "…", short: "…", summary: "…",
  diagram: "pareto",                 // probe | oee | pareto | network | rail | mcdm | control | forming | capacity
  image: "assets/img/my-project.png",// optional, replaces the diagram
  problem: "…", objectives: ["…"], tools: ["…"], method: "…",
  implementation: "…", results: ["…"],
  links: [{ label: "GitHub", href: "https://github.com/you/repo" }]
}
```

## 5. Contact form

GitHub Pages is static, so create a free form at [formspree.io](https://formspree.io) and paste its URL into `site.formEndpoint`. Until then the form opens the visitor's email app with the message filled in.

## 6. Change the look

Colours are variables at the top of `assets/css/styles.css` (`:root` light, `[data-theme="dark"]` dark). Accent = `--accent`.

## 7. Maintenance checklist

- After each new project, course, certificate or role: edit `data/site.js`, commit, push. Pages redeploys automatically.
- Re-export the CV PDF when it changes; bump `site.updated`.
- Keep image files small (under about 200 KB) for fast loading.
