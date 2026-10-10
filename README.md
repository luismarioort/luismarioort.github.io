# luismarioort.github.io

Personal academic website. Plain HTML and CSS, no frameworks or build step.

```
index.html        About + Contact (home page)
research.html     Working papers, work in progress, research experience
teaching.html     Courses and teaching materials
hobbies.html      Photo gallery + "Lately"
style.css         colors, fonts, layout
script.js         language switch, copy-email button, photo viewer, "Last updated"
assets/
  favicon.svg     browser-tab icon
  cv.pdf          your CV (add it)
  papers/         paper PDFs (add them)
  photos/         your photographs (replace the placeholders)
```

## Put it online with GitHub Pages

1. On GitHub, click **+** (top right) then **New repository**.
2. Name it exactly `luismarioort.github.io` and make it **Public**. Click **Create repository**.
3. On the empty repo page, click **uploading an existing file**. Drag in all the files and the `assets` folder. Click **Commit changes**.
4. Go to **Settings**, then **Pages** (under "Code and automation").
   Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, and click **Save**.
5. Wait a few minutes (up to 10), then open https://luismarioort.github.io

Every time you upload a changed file, the site updates within a few minutes.

## Change the background color

Open `style.css`. At the very top, inside `:root`:

```css
--paper: #f1f3ee;      /* PAGE BACKGROUND */
```

Replace `#f1f3ee` with any color code (pick one at https://htmlcolorcodes.com).
A few lines below, the dark-mode block has its own `--paper: #151c19;`, used when a visitor's phone or computer is set to dark mode.

Optional: each HTML file has a `<meta name="theme-color" content="#F1F3EE">` line near the top. That is the color of the browser bar on phones; set it to your new background so they match.

## English and Spanish

Every piece of text is written twice, once per language:

```html
<p data-lang="en">I study economics at ITAM...</p>
<p data-lang="es">Estudio economía en el ITAM...</p>
```

- `data-lang="en"` shows only in English, `data-lang="es"` only in Spanish.
- Anything **without** `data-lang` shows in both (names, emails, paper titles, photos).
- If something only exists in one language (say, an abstract), keep one copy and remove its `data-lang` so it appears in both.
- Page titles (the browser tab) are in each file's `<title>` tag: the English text inside, the Spanish in `data-es="..."`.

The site opens in Spanish for visitors whose browser is in Spanish, in English for everyone else, and remembers whichever language a visitor picks with the button.

## Add photos

1. Export your photos as JPG, about 2000 px on the long side (big enough to look sharp, small enough to load fast).
2. Put them in `assets/photos/`.
3. In `hobbies.html`, copy one `<figure>` block and change the file name in **both** places (`href` and `src`), the `alt` text (a short description for screen readers), and the caption.
4. Delete the placeholder `photo-1.jpg` ... `photo-6.jpg` files and their blocks.

Portrait and landscape photos mix fine and are never cropped. Photos fill the left column first, then the right. Click any photo to see it full screen; arrow keys move between photos.

## Fill in the placeholders

Anything highlighted in yellow is a placeholder. Search each HTML file for `todo`:
replace the text, then delete the `<span class="todo">` and `</span>` around it.

- **Email:** in `index.html`, appears twice: in `href="mailto:..."` and in `data-copy-email="..."`.
- **CV:** save your PDF as `assets/cv.pdf`. Use the same name every time you update it, so the link never breaks.
- **Papers:** put PDFs in `assets/papers/` and point each title's link at the file.
- **Lately** (on the Hobbies page): optional. Delete the whole `<section id="lately">` block if you don't want it.

## Add a paper

In `research.html`, copy an existing block, from `<article class="paper">` to `</article>`, and paste it right below. Then edit:

- title and link to the PDF
- coauthors (link each name to their website, or remove the `<a>` tags)
- status line, in both languages
- one or two sentence summary, in both languages
- full abstract inside `<details>`; delete the whole `<details>` block if you don't want one

## Change the menu

The menu at the top is copied into all four HTML files. If you add, remove or rename an item, do it in all four. The `aria-current="page"` on a link marks the page you're on; leave it on the matching link in each file.

## Preview before uploading

Double-click `index.html` to open it in your browser. Edit, save, refresh.
