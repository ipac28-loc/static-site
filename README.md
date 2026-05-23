# IPAC Hugo Conference Template

A highly-customizable Hugo template tailored for large-scale academic and scientific conferences, specifically optimized for the **International Particle Accelerator Conference (IPAC)** series.

This template is designed to separate technical site layouts and styles from day-to-day administrative content. Organizing committees can completely customize the site branding, colors, typography, news items, milestones, committees, and sponsors via a single central configuration file (`hugo.toml`) and standard Markdown files.

> [!TIP]
> To explore all customizable options (fonts, spacing, announcement banners) and modern Markdown shortcodes, refer to the detailed **[Customization & Shortcode Guide (usage.md)](usage.md)**.

---

## Directory Structure

```text
web/
├── hugo.toml                 # Centralized configuration & databases (News, Dates, Sponsors, Committees)
├── content/                  # Standard Markdown pages grouped by section categories
│   ├── about-*.md            # Welcome, Committees, FAQs, Poster, Societies, etc.
│   ├── authors-*.md          # Abstract guidelines, Paper formatting, Classifications
│   ├── program-*.md          # Synoptic overview, Satellite meetings, Student program
│   ├── travel-*.md           # City guide, Visas, Accommodation resources
│   ├── exhibitor-*.md        # Booth rates, exhibitor listings, registration
│   └── register-*.md         # Conference and student registration portals
├── layouts/                  # Hugo HTML templates (custom structures)
│   ├── _default/             # Base layouts for single and list pages
│   ├── partials/             # Reusable HTML sub-layouts (header, footer, head metadata)
│   └── shortcodes/           # 15 interactive components called directly in Markdown files
├── static/                   # Pure static assets (styles, javascripts, images)
│   ├── css/                  # Custom style sheets and component overrides
│   ├── js/                   # Sidebar toggles, banners, and lightbox scripts
│   └── img/                  # Logos, banners, hero visuals, and poster assets
└── README.md                 # This repository overview file
```

---

## Getting Started

### 1. Prerequisite Installations
Make sure you have the [Hugo Extended](https://gohugo.io/installation/) version installed:
- **macOS** (via Homebrew):
  ```bash
  brew install hugo
  ```
- **Windows** (via Winget):
  ```cmd
  winget install Gohugo.Hugo.Extended
  ```

### 2. Running Locally
1. Clone or download this project workspace to your local system.
2. Open your terminal in the root folder (`web`).
3. Fire up the local hot-reloading development server:
   ```bash
   hugo server
   ```
4. Access your live local build at **`http://localhost:1313/`**. Any modifications to configurations, styles, or markdown content will immediately sync on your screen!

### 3. Customizing Your Branding
Open the main `hugo.toml` file in your editor:
- Update the basic `baseURL` to match your production domain.
- Customize the conference title and main metadata variables under `[params]`.
- Define colors and fonts directly under `[params.text_style]` to fine-tune visual themes without diving into CSS styles.
- To use an image logo, set `logo_image = "/img/your-logo.png"`. Comment it out to dynamically fall back to a beautifully stylized text logo utilizing `logo_prefix` and `logo_suffix`.

---

## Automatic CI/CD Deployment

1. Ensure the `baseURL` in `hugo.toml` is set to your final target URL (e.g., `https://username.github.io/repository-name/`).
2. Push your repository to your GitHub account.
3. In your GitHub Repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The workflow in `.github/workflows/hugo.yml` will trigger immediately on your next commit, building the production assets and deploying them instantly!

---
