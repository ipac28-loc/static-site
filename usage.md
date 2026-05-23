# Hugo Conference Template Customization & Usage Guide

This guide details how to customize and maintain your academic conference website. The site separates system templates from page contents, allowing you to configure databases (important dates, news feeds, tiered sponsors, committees, and appearance styles) in the central configuration file (`hugo.toml`) and author content via interactive Markdown shortcodes.

---

## 1. Central Configuration (`hugo.toml`)

Open `hugo.toml` in the project root to manage the core data and aesthetics of the conference.

### Basic Conference Information
Configure metadata fields under the main global scope or standard `[params]` block:
```toml
[params]
  conf_short_name = "IPAC'28"
  conf_full_name = "19th International Particle Accelerator Conference"
  conf_dates = "June 5-9, 2028"
  conf_start_date = "2028-06-05T08:00:00+09:00"  # Targets the live homepage countdown
  conf_location = "Tokyo International Forum, Tokyo, Japan"
  email = "contact@ipac28.org"
  registration_link = "/register/register-conf/"
  abstract_deadline = "December 5, 2027"
```

### Branding Logos & Visual Toggles
- **Graphic Logo**: Set `logo_image = "/img/your-logo.png"` to display an image logo in the navbar.
- **Dynamic Text Logo fallback**: Comment out `logo_image` to automatically generate a text logo based on `logo_prefix` and `logo_suffix` (e.g. `logo_prefix = "IPAC"` + `logo_suffix = "'28"` outputs a beautiful bold/red **IPAC'28** brand text).
- **Toggles**: Enable countdown timer with `enable_countdown = true` and sponsor loops with `enable_sponsors = true`.

### Global Aesthetics, Fonts & Colors
Modify global styles instantly without opening CSS files:
```toml
[params.text_style]
  font_size = "0.95rem"               # Default body text sizing
  line_height = "1.65"                # Reading line spacing
  font_family = "Inter"               # Google Font for paragraphs
  heading_font_family = "Montserrat"  # Google Font for headlines & titles
  body_color = "#334155"              # Body slate text color
  heading_color = "#1d4485"           # Deep-blue brand headings
  link_color = "#e52421"              # Red accent / hyper-links highlight
```

### Announcement & Notification Banner
A dismissible notification banner appears at the very top of the website (remembers dismissal via `localStorage`):
```toml
  enable_announcement = true
  announcement_text = "Abstract submission will open on Oct 1, 2027!"
  announcement_link = "/authors/authors-abstract/"  # Destination URL
```

### Central Milestones & Timeline Database
Used by the `{{< full-dates-timeline >}}` shortcode to automatically generate a complete visual timeline.
- **`type` choices**: `"info"` (blue bubble), `"open"` (green bubble for openings), `"close"` (red bubble for deadlines).
- **Past Milestones**: The template automatically compares the milestone `date` against the build time, marking past milestones as expired with a gray `Outdated` badge.
```toml
[[params.important_dates]]
  date = "2027-12-30T23:59:59+09:00"
  title = "Abstract Submission Deadline"
  type = "close"
  description = "Abstract submission closes strictly at 23:59 JST. No late submissions will be accepted."
```

### Latest News & Announcements Feed
Renders dynamically on the homepage (the newest 3 news items will automatically be featured):
```toml
[[params.news]]
  date = "2026-05-15T00:00:00+09:00"
  title = "Exhibitor Prospectus Now Available"
  summary = "The exhibitor and sponsorship prospectus for IPAC'28 is now available for download..."
  link = "/exhibitor/exhibitor-info/"
```

### Tiered Sponsors & Partners
Directly powers the `{{< sponsors-grid >}}` component:
- **`tier` choices**: `"platinum"`, `"gold"`, `"silver"`, `"bronze"`, `"supporter"`. Layout grids and dimensions automatically adapt to matches the tier hierarchy.
```toml
[[params.sponsors]]
  name    = "Quantum Dynamics Corp."
  logo    = "/img/ipac28_600x304.png"
  url     = "https://example.com/quantum-dynamics"
  tier    = "platinum"
  tagline = "Pioneering the next generation of particle accelerator power systems."
```

### Organizing Committee Database
Powers the fully automatic `{{< committees-list >}}` layout:
- **Chairs Spotlight**: Setting `chair = true` creates a highly visible avatar spotlight card at the top of the committee panel.
- **SAB Regional Splitting**: For the Scientific Advisory Board (`committee_sab`), members are automatically grouped and nested into collapsible regional tabs (America, Asia, Europe) based on their `region` attribute.
```toml
[[params.committee_ioc]]
  name        = "Tadashi"
  surname     = "Koseki"
  institution = "KEK"
  location    = "Japan"
  desc        = "IOC Chair"
  chair       = true

[[params.committee_sab]]
  name        = "Sarah"
  surname     = "Cousineau"
  institution = "ORNL"
  location    = "USA"
  region      = "America"
  chair       = false
```

---

## 2. Interactive Markdown Shortcodes

To enrich your Markdown page layout, call these high-quality custom shortcodes using the standard angle-bracket syntax `{{< shortcode_name ... >}}`.

---

### A. Configuration-Driven Dynamic Shortcodes

These shortcodes retrieve structured data from `hugo.toml` to automate content compilation.

#### 1. Central Deadlines Timeline (`full-dates-timeline`)
Renders the complete dates timeline defined under `[[params.important_dates]]`.
```markdown
{{< full-dates-timeline >}}
```

#### 2. Comprehensive Committees Grid (`committees-list`)
Renders all committees configured in `hugo.toml` (`committee_ioc`, `committee_spc`, `committee_sab`, `committee_loc`) in detailed roster tables, automatically highlighting chairs and grouping SAB boards by regions.
```markdown
{{< committees-list >}}
```

#### 3. Tiered Sponsors & Industry Partners (`sponsors-grid`)
Renders all sponsors entered under `[[params.sponsors]]` grouped into their hierarchy tiers. Includes beautiful hover effects and a call-to-action prospectus download section.
```markdown
{{< sponsors-grid >}}
```

---

### B. Interactive Layout Components

#### 4. Scientific Program Synoptic Grid (`synoptic-table`)
Renders a beautiful, responsive multi-day grid overview of the conference timetable (Monday to Friday, covering plenary sessions, parallel talks, poster sessions, coffee breaks, social banquets, and post-conference tours).
```markdown
{{< synoptic-table >}}
```

#### 5. Collapsible Accordions (FAQs)
Creates animated expandable items perfect for FAQ segments or troubleshooting guidelines.
```markdown
{{< accordion title="How do I request an official Invitation Letter?" >}}
Invitation letters are generated automatically in the registration portal after the registration fees have been processed.
{{< /accordion >}}
```

#### 6. Premium Content Tabs (`tab-container` / `tab`)
Simplifies dense documentation into clean click-to-switch tabs.
```markdown
{{< tab-container >}}
    {{< tab title="From Haneda Airport (HND)" >}}
    Take the **Tokyo Monorail** from Haneda to Hamamatsucho Station, then transfer to the JR Yamanote Line.
    {{< /tab >}}

    {{< tab title="From Narita Airport (NRT)" >}}
    Take the **JR Narita Express (N'EX)** directly to Tokyo Station.
    {{< /tab >}}
{{< /tab-container >}}
```

#### 7. Interactive Poster Showcase & Downloader (`poster-download`)
Displays official posters with dimensions, file sizes, direct download triggers, and a built-in interactive Javascript-powered lightbox enlargement preview.
```markdown
{{< poster-download
    src="/img/ipac28_poster_a0.png"
    dimensions="A0 Size (841 x 1189 mm)"
    format="High-Resolution PDF / PNG (300 DPI)"
    size="1.2 MB"
    description="Download the official IPAC'28 poster to print or share at your home institute."
    download1_label="Download A0 Poster PNG"
    download2_label="Download A4 Digital PDF"
>}}
```

#### 8. Manual Timelines (`timeline` / `timeline-item`)
Create a custom vertical timeline anywhere inside a markdown page.
```markdown
{{< timeline >}}
    {{< timeline-item date="December 5, 2027" badge="Urgent" badge_class="badge-danger" title="Abstract Deadline" >}}
    Abstract submission closes strictly at 23:59 JST.
    {{< /timeline-item >}}

    {{< timeline-item date="January 10, 2028" badge="Info" badge_class="badge-default" title="Registration Opens" >}}
    Early-bird and student registration packages become active.
    {{< /timeline-item >}}
{{< /timeline >}}
```
*Available `badge_class` options: `badge-default` (gray), `badge-success` (green), `badge-danger` (red), `badge-info` (blue).*

#### 9. Manual Committee & Roster Grids (`member-list` / `member`)
Allows you to create custom cards for specific ad-hoc panels or local contacts manually within any page.
```markdown
{{< member-list title="Registration Inquiries Team" >}}
    {{< member name="Alice Green" role="Support Desk" inst="Local Lab" icon="user-tie" >}}
    {{< member name="Bob Carter" role="Finance Assistant" inst="University of Physics" icon="user" >}}
{{< /member-list >}}
```
*Supported `icon` keys correspond to FontAwesome classes (e.g. `user`, `user-tie`, `envelope`, `briefcase`).*

---

### C. Media & External Embeds

#### 10. Responsive Video Player (`video`)
Embeds video wrappers supporting YouTube (URLs or IDs), Vimeo (URLs or IDs), or local MP4 files.
```markdown
{{< video provider="youtube" src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >}}
{{< video provider="vimeo" src="123456789" >}}
{{< video provider="local" src="/img/promo-video.mp4" >}}
```

#### 11. Custom Maps (`map`)
Embeds fully interactive Google Maps iframe cards.
```markdown
{{< map
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.0113835697227!2d139.76192807639556!3d35.67484393021946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bf79a957b85%3A0xe1bd4af00f77b797!2sTokyo%20International%20Forum!5e0!3m2!1sen!2sjp!4v1716447844001!5m2!1sen!2sjp"
    title="Tokyo International Forum Venue Map"
>}}
```

#### 12. Conference Interactive Calendar (`calendar`)
Embeds responsive calendars (like Google Calendars) to show real-time meeting events.
```markdown
{{< calendar src="https://calendar.google.com/calendar/embed?src=en.japanese%23holiday%40group.v.calendar.google.com" >}}
```
