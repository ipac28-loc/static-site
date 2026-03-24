# IPAC Hugo Conference Template

> A modern, premium, and highly flexible static website template expertly designed for the International Particle Accelerator Conference (IPAC) series and similar academic/scientific conferences.

This project is built directly on **Hugo**, completely separating the elegant visual design from the content. It allows future organizing committees to launch a world-class conference website in minutes simply by editing a single configuration file (`hugo.toml`) and writing standard Markdown.

## 🌟 Core Features

- **Zero-Code Configuration**: Everything from the conference name, dates, locations, to the dynamic statistics and social media links are centralized in `hugo.toml`.
- **Dynamic Content Engine**: Create and edit pages easily using standard Markdown `.md` files in the `content/` directory. No HTML knowledge required.
- **Image & Text Logo Support**: Seamlessly toggle between a sleek text-based typographic logo (e.g., `IPAC'28`) or an uploaded graphical PNG logo by specifying its path.
- **Micro-Animations & Responsive Design**: Smooth scrolling fade-ins and an architecture that works flawlessly on massive desktop monitors and mobile devices alike.
- **Built-in Shortcodes**: Advanced UI elements (like the Committee Member photo cards) are abstracted into easy-to-use Hugo shortcodes, so your markdown stays clean.
- **Automated CI/CD**: Pre-configured GitHub Actions automatically build the site and deploy it to GitHub Pages upon every `main` branch push.

---

## 📂 Directory Structure
```text
ipac_template/
├── hugo.toml           # ⚙️ Master Site Configuration (Dates, Logos, Menus, Socials)
├── archetypes/         # Templates for new markdown pages
├── content/            # 📝 All markdown pages (about.md, dates.md, committees.md)
├── layouts/            # 🎨 HTML templates (headers, footers, homepage, baseof)
├── static/             # 📁 Assorted static assets 
│   ├── css/            # Main styling system
│   ├── js/             # Custom interactions
│   ├── img/            # Images (Upload your logo here!)
│   └── CNAME           # Custom domain for GitHub Pages
└── .github/workflows/  # 🚀 CI/CD deployment pipelines
```

---

## 🚀 Getting Started

### 1. Running Locally
1. Install [Hugo](https://gohugo.io/installation/) (Extended version recommended).
2. Open your terminal in this project's directory.
3. Run the live-reload development server:
   ```bash
   hugo server -w
   ```
4. Access the site at `http://localhost:1313/` in your browser. Any changes you make will instantly auto-reload.

### 2. Website Customization (`hugo.toml`)
All heavy lifting is done in `hugo.toml`. Open it to configure:
- **`conf_short_name`** / **`conf_dates`** / **`conf_location`**: Updates the homepage hero text and footers.
- **`logo_image`**: Set this to `/img/your_logo.png` to automatically display your uploaded graphical logo on the Navbar and Footer. Delete or comment out the line to revert to the beautiful text-based default.
- **`[params.stats]`**: Update the `attendees`, `presentations`, and `exhibitors` numbers shown on the homepage.
- **`[params.social]`**: Fill in your Twitter/LinkedIn/Facebook links. The matching icons will dynamically appear in the footer.
- **`[[menu.main]]` & `[[menu.footer_*]]`**: Add or remove navigation links to any new pages you've created.

### 3. Creating New Pages
To create a new page, simply run:
```bash
hugo new travel.md
```
Write your content in markdown. Thanks to our `layouts/_default/single.html`, your new page will automatically be wrapped in the premium IPAC styling, complete with a hero background banner and a beautifully padded text card.

### 4. Committee Members (Shortcodes)
For the `committees.md` page, we have supplied a custom `{{< member >}}` shortcode to instantly generate polished profile cards without touching HTML.
**Example usage inside markdown**:
```markdown
{{< member name="Dr. Jane Doe" role="Chair" inst="National Laboratory" icon="user" >}}
```

---

## 🎨 Advanced Theming
To change the universal color scheme (e.g. from Deep Blue to a custom University color), open `static/css/style.css` and update the CSS variables under `:root`:
```css
:root {
    --clr-primary: #0f2c59; /* Main Dark Backgrounds */
    --clr-secondary: #00b4d8; /* Highlight Components */
    --clr-accent: #f59e0b; /* Golden Orange Buttons/Accents */
}
```

---

## 🌐 Deployment (GitHub Pages)

This template includes a pre-configured, highly optimized GitHub Actions workflow (`.github/workflows/hugo.yml`).

1. Ensure your specific domain is written inside `static/CNAME` and your `baseURL` is updated in `hugo.toml`.
2. Push your code to the `main` or `master` branch on GitHub.
3. In your GitHub repository settings, route to **Pages > Build and deployment > Source** and explicitly select **GitHub Actions**.
4. The Action will automatically build your Hugo site and deploy it live to the world!
