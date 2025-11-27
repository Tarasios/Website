# Quick Start Guide - Adding a New Project

This guide shows you how to quickly add a new project to your portfolio.

## Step-by-Step: Adding a New Project

### 1. Copy the Template Files

**Windows (PowerShell/CMD):**
```powershell
# Copy HTML template
copy public\projects\project-template.html public\projects\my-awesome-project.html

# Copy JSON template
copy public\lang\messages\en\project-template.json public\lang\messages\en\my-awesome-project.json
```

**Mac/Linux:**
```bash
# Copy HTML template
cp public/projects/project-template.html public/projects/my-awesome-project.html

# Copy JSON template
cp public/lang/messages/en/project-template.json public/lang/messages/en/my-awesome-project.json
```

### 2. Edit Your Project JSON File

Open `public/lang/messages/en/my-awesome-project.json` and customize:

```json
{
    "page-title": "My Awesome Project - Cassiel Williams",
    "project-title": "My Awesome Project",
    "project-subtitle": "A brief description that captures what your project does",

    "overview-title": "Overview",
    "overview-p1": "Describe what your project is and what problem it solves...",
    "overview-p2": "Add more context about the project scope and goals...",

    "tech-stack-title": "Technologies Used",
    "tech-1": "Python",
    "tech-2": "Flask",
    "tech-3": "PostgreSQL",

    "feature-1-title": "Feature One",
    "feature-1-desc": "Description of what this feature does...",

    "challenges-title": "Challenges & Solutions",
    "challenges-p1": "Describe the technical challenges you faced...",

    "learnings-title": "What I Learned",
    "learnings-p1": "Key technical skills or concepts you learned..."
}
```

### 3. Add Your Project to the Home Page

Open `public/index.html` and add a new project card in the projects section:

```html
<div class="project-card" onclick="window.location.href='projects/my-awesome-project.html'">
    <h3 id="project-myproject-title">My Awesome Project</h3>
    <p id="project-myproject-desc"></p>
    <div class="project-meta">
        <span class="tech-tag" id="tech-myproject-1">Python</span>
        <span class="tech-tag" id="tech-myproject-2">Flask</span>
        <span class="tech-tag" id="tech-myproject-3">PostgreSQL</span>
    </div>
</div>
```

### 4. Add Translations to index.json

Open `public/lang/messages/en/index.json` and add:

```json
{
    ...existing content...,
    "project-myproject-title": "My Awesome Project",
    "project-myproject-desc": "A brief description for the project card on the home page",
    "tech-myproject-1": "Python",
    "tech-myproject-2": "Flask",
    "tech-myproject-3": "PostgreSQL"
}
```

### 5. (Optional) Add a Project Image

If you have a screenshot or image:

1. Save your image to `public/images/my-awesome-project.jpg`
2. Open `public/projects/my-awesome-project.html`
3. Find the commented-out image section:
   ```html
   <!-- Optional: Project Image -->
   <!-- Uncomment and add src when you have an image -->
   <!--
   <img src="../images/project-name.jpg" alt="Project Screenshot" class="project-image">
   -->
   ```
4. Uncomment and update:
   ```html
   <img src="../images/my-awesome-project.jpg" alt="My Awesome Project Screenshot" class="project-image">
   ```

### 6. (Optional) Add External Links

If you have a GitHub repo or live demo:

1. Open `public/projects/my-awesome-project.html`
2. Find the commented-out links section at the bottom
3. Uncomment and update:
   ```html
   <div class="project-links">
       <a href="https://github.com/yourusername/project" class="project-link" id="link-github">GitHub Repository</a>
       <a href="https://demo.yourproject.com" class="project-link" id="link-demo">Live Demo</a>
   </div>
   ```

## Customizing Your Project Page

### Adding More Features

In your HTML template, you can add more feature items:

```html
<div class="education-item">
    <h3 id="feature-4-title"></h3>
    <p id="feature-4-desc"></p>
</div>
```

Then add to your JSON:

```json
"feature-4-title": "Feature Four",
"feature-4-desc": "Description of this feature..."
```

### Adding More Technology Tags

In the HTML:

```html
<span class="tech-tag" id="tech-4">Docker</span>
<span class="tech-tag" id="tech-5">Redis</span>
```

In the JSON:

```json
"tech-4": "Docker",
"tech-5": "Redis"
```

## Project Without Images Template

If your project doesn't have images, that's perfectly fine! The template works great without them. Just:

1. Leave the image section commented out
2. Focus on clear, descriptive text
3. Use the features section to highlight what makes your project interesting

## Testing Your Project Page

1. Open `public/projects/my-awesome-project.html` in your browser
2. Check that all text appears correctly (no empty fields or IDs showing)
3. Test the "Back to Projects" button
4. Test the navigation links
5. Test the language toggle (if you've added French translations)

## Common Mistakes to Avoid

❌ **Don't** put text directly in HTML files
✅ **Do** put all text in the JSON file

❌ **Don't** forget to update both the HTML and JSON files
✅ **Do** make sure every HTML ID has a matching JSON key

❌ **Don't** use different names for HTML and JSON files
✅ **Do** keep them identical (e.g., `my-project.html` and `my-project.json`)

❌ **Don't** forget to add your project to the home page
✅ **Do** add a project card to `index.html` and translations to `index.json`

## Need Help?

- Check the full [README.md](README.md) for detailed documentation
- All text MUST be in JSON files, never in HTML
- IDs in HTML must match keys in JSON exactly
- File names must match between HTML and JSON (minus the extension)

## Example Project Structure

```
public/
├── projects/
│   ├── project-template.html          # Template (don't edit)
│   ├── my-awesome-project.html        # Your new project
│   └── another-cool-project.html      # Another project
├── lang/messages/en/
│   ├── project-template.json          # Template (don't edit)
│   ├── my-awesome-project.json        # Your project text
│   └── another-cool-project.json      # Another project text
└── images/                            # Optional images
    ├── my-awesome-project.jpg
    └── another-cool-project.png
```

Happy coding! 🚀
