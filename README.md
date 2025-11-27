# Cassiel Williams - Portfolio Website

A modern, static portfolio website with internationalization support (English/French) and a dark teal/green colorblind-friendly theme.

## Project Structure

```
Website/
├── public/
│   ├── css/
│   │   └── main.css              # Main stylesheet with dark teal theme
│   ├── js/
│   │   ├── i18n.js               # Internationalization system
│   │   └── index.js              # Page-specific JavaScript
│   ├── lang/
│   │   └── messages/
│   │       └── en/               # English language files
│   │           ├── index.json    # Home page text
│   │           ├── about.json    # About page text
│   │           └── project-template.json  # Template for project pages
│   ├── projects/
│   │   └── project-template.html # Template for creating new project pages
│   ├── index.html                # Home page
│   └── about.html                # About page
└── README.md                     # This file
```

## Design Features

### Color Scheme
- **Dark Teal Theme**: Colorblind-friendly palette optimized for accessibility
  - Primary: `#20B2AA` (Light Sea Green)
  - Secondary: `#26A69A` (Teal)
  - Background: `#004d4d` to `#003333` gradient
  - Dark surfaces: `#1a1a1a`, `#2d2d2d`
  - Text: `#e0e0e0` on dark backgrounds

### Internationalization (i18n)
- All text content stored in `lang/messages/[language]/[page].json`
- Easy to add French translations by creating `lang/messages/fr/` directory
- Language toggle button in navigation (currently English/French)
- Automatic language detection and persistence using localStorage

## How to Add Content

### Adding a New Page

1. **Create the HTML file** in `public/`
   - Copy the structure from `about.html` or `index.html`
   - Update navigation links
   - Add content placeholders with unique IDs

2. **Create the language file** in `public/lang/messages/en/`
   - Create `[page-name].json`
   - Add all text content as key-value pairs
   - Keys should match the element IDs in your HTML

3. **Update navigation** in all pages
   - Add new nav link to all HTML files
   - Add corresponding translations to all language JSON files

### Adding a New Project Page

1. **Copy the template**
   ```bash
   cp public/projects/project-template.html public/projects/your-project.html
   ```

2. **Create the language file**
   ```bash
   cp public/lang/messages/en/project-template.json public/lang/messages/en/your-project.json
   ```

3. **Edit the JSON file** with your project details
   - Update project title, subtitle, overview
   - Add technologies used
   - Describe features, challenges, and learnings
   - Uncomment and add links to GitHub/demo if available

4. **Add project image** (optional)
   - Place image in `public/images/`
   - Uncomment the image section in the HTML
   - Update the `src` attribute

5. **Add project card** to `index.html`
   - Add a new project card in the projects section
   - Link to your new project page
   - Add translations to `index.json`

### Expanding Navigation

To add a new navigation item:

1. Add the HTML link in all pages:
   ```html
   <li><a href="new-page.html" id="nav-newpage">New Page</a></li>
   ```

2. Add translation in all language files:
   ```json
   "nav-newpage": "New Page"
   ```

## Language Files Structure

Each page requires a corresponding JSON file with ALL text content:

**Example: `about.json`**
```json
{
    "page-title": "About Me - Cassiel Williams",
    "nav-home": "Home",
    "about-hero-title": "About Me",
    "about-background-p1": "Text content here..."
}
```

**Important Rules:**
- NO text should be hardcoded in HTML or JavaScript files
- Every text element must have a unique ID matching a JSON key
- IDs should be descriptive (e.g., `about-background-title`, `project-overview-p1`)

## Development Guidelines

### Adding New Styles

Edit `public/css/main.css` to maintain the dark teal theme:
- Use color variables from the existing palette
- Test with colorblind simulation tools
- Maintain contrast ratios for accessibility

### JavaScript Modifications

Edit `public/js/index.js` for page-specific functionality:
- Keep inline styles minimal
- Use CSS classes when possible
- Maintain the existing color scheme

### Future Enhancements

To add French translations:

1. Create `public/lang/messages/fr/` directory
2. Copy all JSON files from `en/` to `fr/`
3. Translate all values (keep keys identical)
4. The language toggle will automatically work

## File Naming Conventions

- HTML pages: `page-name.html` (lowercase with hyphens)
- Language files: `page-name.json` (must match HTML filename)
- Project pages: `public/projects/project-name.html`
- Project language files: `public/lang/messages/en/project-name.json`

## Deployment

This is a static site and can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Simply deploy the `public/` directory.

## Accessibility Features

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus states for interactive elements
- Colorblind-friendly color palette
- Responsive design for mobile devices

## License

Personal portfolio website for Cassiel Williams.
