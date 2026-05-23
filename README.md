# IPAC Hugo Conference Template

A clean and flexible Hugo template designed for academic and scientific conferences, such as the International Particle Accelerator Conference (IPAC). 

This template separates visual design from content, allowing organizing committees to customize the website via a single configuration file (`hugo.toml`) and standard Markdown files.

For custom options (fonts, spacing, brand colors, announcement banners) and interactive markdown shortcodes, see [usage.md](usage.md).

## Features

- **Configuration-Driven**: Conference names, dates, locations, statistics, and social links are managed entirely in `hugo.toml`.
- **Markdown Support**: All subpages use standard `.md` files in the `content/` directory.
- **Logos**: Supports both text-based titles (e.g., `IPAC'28`) and graphic PNG logos.
- **Interactive Shortcodes**: Ready-to-use shortcodes for committees, FAQ dropdowns, tab switchers, scheduling tables, and vertical timelines.
- **Auto Deployment**: GitHub Actions workflow included to build and deploy to GitHub Pages automatically on push.

## Directory Structure

```text
web-test/
├── hugo.toml           # Configuration file
├── content/            # Markdown pages (welcome.md, dates.md, committees.md)
├── layouts/            # Page templates (header, footer, shortcodes, single)
└── static/             # CSS styles, JS scripts, and images
```

## Getting Started

### 1. Run Locally
1. Install [Hugo](https://gohugo.io/installation/) (Extended version).
2. Open terminal in the project directory.
3. Run the development server:
   ```bash
   hugo server
   ```
4. Open `http://localhost:1313/` in your browser.

### 2. Customization (`hugo.toml`)
Open `hugo.toml` to customize:
- `conf_short_name` / `conf_dates` / `conf_location`: Core conference metadata.
- `logo_image`: Set to `/img/your_logo.png` to show a logo image, or comment it out to use the text logo.
- `[params.stats]`: Update attendee, presentation, and exhibitor counters.
- `[params.social]`: Add your social media links.
- `[[menu.main]]`: Manage navigation menu items.

### 3. Adding Pages
Create a new page in `content/` (e.g., `content/travel.md`) and add your Markdown. It will automatically use the site's layout, subpage banner, and responsive sidebar.

## Custom Colors
To change the brand colors, modify the CSS variables inside `static/css/style.css`:
```css
:root {
    --color-nav-bg-scrolled: #208cc6;
    --color-link-default: #e52421;
    --color-text-heading: #1d4485;
}
```

## GitHub Pages Deployment
A GitHub Actions workflow is provided in `.github/workflows/hugo.yml`.
1. Update `baseURL` in `hugo.toml`.
2. Push your changes to GitHub.
3. In GitHub repo settings, go to **Pages** and set **Source** to **GitHub Actions**. It will build and deploy automatically.
