# Hugo Conference Template Customization & Usage

This manual explains how to customize your academic conference website using `hugo.toml` and write page content with custom Markdown shortcodes.

## 1. Customizing hugo.toml

Open `hugo.toml` in the project root to configure the following properties:

### Conference Brand & Information
- `params.logo_prefix` & `params.logo_suffix`: Text-based logo (e.g., prefix "IPAC" + suffix "'28" displays as **IPAC'28**).
- `params.logo_image`: Path to a graphic logo (e.g., `"/img/your_logo.png"`). Comment out to fallback to the text logo.
- `params.conf_short_name` & `params.conf_full_name`: Conference names.
- `params.conf_dates` & `params.conf_location`: Dates and location text.
- `params.email`: Contact email address.
- `params.registration_link`: Target URL for the "Register" navigation button.
- `params.abstract_deadline`: Abstract deadline text.

### Text & Color Style (`[params.text_style]`)
You can configure global text styling and colors directly in `hugo.toml` without editing CSS files:
```toml
[params.text_style]
  font_size = "1.05rem"               # Body font size (e.g., "1rem", "1.05rem")
  line_height = "1.8"                 # Line spacing (e.g., "1.6", "1.8")
  font_family = "Inter"               # Body font family
  heading_font_family = "Montserrat"  # Heading font family
  body_color = "#334155"              # Body text hex color
  heading_color = "#1d4485"           # Heading titles hex color
  link_color = "#e52421"              # Link and accent hex color
```

### Announcement Banner
A dismissible notification banner at the top of the site (remembers closure via `localStorage`):
- `params.enable_announcement`: Toggle displaying the banner (`true` or `false`).
- `params.announcement_text`: Notification text.
- `params.announcement_link`: Destination URL when clicking the banner details/link.

---

## 2. Using Subpage Shortcodes

All shortcodes must use the angle bracket `{{< >}}` syntax to ensure proper Markdown rendering.

### Collapsible Accordions (FAQs)
Creates expandable toggle sections.
```markdown
{{< accordion title="How do I request an official Invitation Letter?" >}}
Invitation letters are generated after registration fees are paid.
{{< /accordion >}}
```

### Content Tabs (Transport / Guidelines)
Organizes content under click-to-switch tab menus.
```markdown
{{< tab-container >}}
    {{< tab title="From Haneda Airport (HND)" >}}
    Take the **Tokyo Monorail** from Haneda to **Hamamatsucho Station**.
    {{< /tab >}}
    
    {{< tab title="From Narita Airport (NRT)" >}}
    Take the **JR Narita Express (N'EX)** directly to **Tokyo Station**.
    {{< /tab >}}
{{< /tab-container >}}
```

### Program Timetable Grid
Renders the multi-day conference timetable grid.
```markdown
{{< synoptic-table >}}
```

### Deadlines Timeline
Renders a visual vertical timeline for milestones.
```markdown
{{< timeline >}}
    {{< timeline-item date="December 5, 2027" badge="Critical" badge_class="badge-danger" title="Abstract Deadline" >}}
    Abstract submission closes strictly at 23:59 JST.
    {{< /timeline-item >}}
    
    {{< timeline-item date="January 10, 2028" badge="Info" badge_class="badge-default" title="Registration Opens" >}}
    Standard registration becomes active.
    {{< /timeline-item >}}
{{< /timeline >}}
```
*Available `badge_class` choices: `badge-default`, `badge-success`, `badge-danger`.*

### Committee Lists
Renders profile card grids for organizing committees.
```markdown
{{< member-list title="Local Organizing Committee (LOC)" >}}
    {{< member name="Dr. Jane Doe" role="Chair" inst="National Laboratory" >}}
    {{< member name="Prof. John Smith" role="Co-Chair" inst="University of Science" >}}
{{< /member-list >}}
```

### Video and Map Embeds
Embeds responsive maps and video players:
```markdown
{{< video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" provider="youtube" >}}
{{< map src="https://www.google.com/maps/embed?pb=..." title="Tokyo International Forum" >}}
```
