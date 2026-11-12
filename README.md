# Brass & Bristle: barbershop landing page

A responsive one-page website for a **fictional** neighbourhood barbershop.
Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

**Features**

- Dark, mobile-first layout, tested from 360px phones to wide desktops
- Semantic markup (`header`, `nav`, `main`, `section`, `footer`), alt text, visible focus states, skip link, WCAG AA contrast
- Burger menu (Esc / outside click to close, `aria-expanded`)
- Smooth scrolling that respects *reduced motion* settings
- Booking request form with client-side validation and accessible error messages
- Fade-in sections with `IntersectionObserver`
- Every color, font and spacing value lives in CSS custom properties, so a new niche takes minutes

## Project structure

```
index.html        All page content and texts
css/style.css     Styles; design tokens are at the top in :root
js/main.js        Burger menu, smooth scroll, reveal animation, form validation
assets/           Images and favicon; SVG placeholders in assets/placeholders/
README.md
```

## Run locally

Opening `index.html` by double-click works. A local server is closer to real hosting, though.

**Python** (installed on most machines):

```bash
python -m http.server 5500
```

**Node.js**:

```bash
npx serve .
```

Then open <http://localhost:5500> (or the address `serve` prints). The **Live Server** extension in VS Code works as well.

## Deploy

### Netlify (drag & drop, about 1 minute)

1. Sign in at [app.netlify.com](https://app.netlify.com).
2. Go to **Sites → Add new site → Deploy manually**.
3. Drag the `barbershop` folder onto the upload area.
4. Done. Rename the site in **Site configuration → Change site name** to get `your-name.netlify.app`.

To deploy from GitHub instead, choose **Import an existing project**, pick the repository, leave the build command empty and set the publish directory to the folder that contains `index.html`.

### GitHub Pages

1. Create a new public repository on GitHub and push the contents of this folder:

   ```bash
   git init
   git add .
   git commit -m "Brass & Bristle barbershop landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. In the repository open **Settings → Pages**.
3. Under **Build and deployment** choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

All paths are relative, so the page also works from a sub-folder (for example one repository with `coffee-shop/` and `barbershop/`, served at `…/barbershop/`).

## Customising for another business

### Colors, fonts, spacing

Open `css/style.css`. Everything is in the `:root` block at the top:

| Variable | What it controls |
|---|---|
| `--color-bg`, `--color-surface`, `--color-surface-alt` | Page, card and alternating section backgrounds |
| `--color-text`, `--color-muted` | Main and secondary text |
| `--color-primary`, `--color-primary-dark`, `--color-on-primary` | Buttons, prices, links, their hover state and the text on buttons |
| `--color-accent`, `--color-on-accent` | Decorative details (category underlines, the "Most booked" tag) |
| `--color-header-bg` | Sticky header background (keep it slightly transparent) |
| `--color-dark`, `--color-on-dark` | Footer and hero |
| `--hero-overlay` | Darkening over the hero photo (keeps the headline readable) |
| `--map-bg`, `--map-line`, `--map-road` | Colors of the map placeholder |
| `--font-heading`, `--font-body` | Font families. Also update the Google Fonts `<link>` in `index.html` |
| `--heading-weight`, `--heading-transform`, `--heading-letter-spacing` | Heading style (uppercase Oswald here; set `none` for normal case) |
| `--space-*`, `--section-padding` | Spacing scale and vertical rhythm |
| `--radius`, `--radius-pill`, `--shadow`, `--container` | Corner rounding, button shape, shadows, max content width |

For a light theme, swap the background and text colors (see the coffee shop version for a light palette). Check contrast with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/): text needs at least 4.5:1.

### Texts

All texts are in `index.html`, grouped by HTML comments (`1. Header`, `2. Hero`, …).
Update the `<title>` and `<meta name="description">` in `<head>` as well. Form error messages are in `js/main.js` (`rules`).

### Images

The page uses free stock photos from Unsplash (see [Photo credits](#photo-credits)). Neutral SVG placeholders with the same names live in `assets/placeholders/`, handy when starting a new niche before you have photos.

| File | Where it appears | Recommended size |
|---|---|---|
| `hero.jpg` | Hero background | 1920×1200, under ~450 KB |
| `about.jpg` | About section | 800×1000 (portrait) |
| `gallery-1.jpg` | Gallery, featured (shown larger on desktop) | 1000×1000 (square) |
| `gallery-2.jpg` … `gallery-6.jpg` | Gallery | 800×800 (square) |
| `favicon.svg` | Browser tab icon | square SVG or 512×512 PNG |

Compress new photos first, for example with [Squoosh](https://squoosh.app) (JPG or WebP, quality around 70–75). Free sources: [Unsplash](https://unsplash.com) (use the *Free* license filter, not Unsplash+) and [Pexels](https://www.pexels.com).

When the file name or extension changes, update it in:

- **Hero:** `--hero-image` in `css/style.css` and the `<link rel="preload">` in the `<head>` of `index.html`
- **About and gallery:** the `src` attributes in `index.html`. Also update each `alt` text to describe the new photo.

If the new hero photo is lighter or busier, raise the opacity in `--hero-overlay` so the headline stays readable.

### Map

The map is a styled placeholder. To show a real map, open Google Maps, find the address, click **Share → Embed a map**, copy the `<iframe>` and paste it in place of the `<div class="map map-placeholder">` block in `index.html`. Keep `class="map"` on the iframe and add `title="Map to [business name]"` and `loading="lazy"`.

### Booking form

The form is validated in the browser but **does not send anything**: it shows a confirmation message. To receive requests:

- **Netlify Forms:** add `name="booking" method="POST" data-netlify="true"` to the `<form>`.
- **Formspree:** add `action="https://formspree.io/f/<your-id>" method="POST"` to the `<form>`.

Then in `js/main.js`, in the submit handler, replace the demo block (after the `// Demo only` comment) with `form.submit();` so the form is sent once validation passes. For real online booking, link the "Book now" buttons to a service such as Calendly, Fresha or Booksy instead.

### Social links

In the footer replace `href="#"` on the Instagram, Facebook and TikTok links with real profile URLs.

## Credits

Brass & Bristle is a fictional business created for a portfolio. All names, reviews, addresses and phone numbers are made up.

### Photo credits

All photos are from [Unsplash](https://unsplash.com) and used under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required, credited here anyway).

| File | Photo | Photographer |
|---|---|---|
| `hero.jpg` | [Barber chairs in a dimly lit salon](https://unsplash.com/photos/fa0DqQ91dWU) | [@tanyabarrow](https://unsplash.com/@tanyabarrow) |
| `about.jpg` | [Haircut with scissors](https://unsplash.com/photos/tgPrIYnW3g4) | [Nate Johnston](https://unsplash.com/@natejohnston) |
| `gallery-1.jpg` | [Straight razor line-up](https://unsplash.com/photos/1Pmp9uxK8X8) | [Agustin Fernandez](https://unsplash.com/@agustinfernandez) |
| `gallery-2.jpg` | [Traditional shave](https://unsplash.com/photos/TGdKH24tX7I) | [Victor Sirbu](https://unsplash.com/@victorsirbu04) |
| `gallery-3.jpg` | [Barber chair by a brick wall](https://unsplash.com/photos/EW_rqoSdDes) | [Nathon Oski](https://unsplash.com/@onatecan) |
| `gallery-4.jpg` | [Scissors on a wooden counter](https://unsplash.com/photos/Xb_6OTCCnXo) | [František Čaník](https://unsplash.com/@snipi) |
| `gallery-5.jpg` | [Beard trim](https://unsplash.com/photos/4k60yfGy7fU) | [Mr Shave](https://unsplash.com/@mrshave) |
| `gallery-6.jpg` | [Barber pole](https://unsplash.com/photos/q49oU8NeOHQ) | [Tim Mossholder](https://unsplash.com/@timmossholder) |

### Fonts

[Oswald](https://fonts.google.com/specimen/Oswald) and [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts (SIL Open Font License).
