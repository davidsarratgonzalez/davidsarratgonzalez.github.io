# Example Customizations

This document shows practical examples of how to customize your resume using the new configuration system.

## Example 1: Reordering Sections

To change the order of sections, simply edit `src/data/resume-config.json`:

```json
{
  "title": "David Sarrat González - Resume",
  "sectionOrder": [
    "about",
    "publications",
    "experience", 
    "education",
    "projects",
    "awards",
    "presentations",
    "workshops",
    "posters",
    "theses",
    "volunteering"
  ],
  "settings": {
    "showSectionNumbers": false,
    "compactMode": false,
    "theme": "default"
  }
}
```

This would move Publications to appear right after the About section.

## Example 2: Disabling a Section

To temporarily hide a section, edit `src/data/sections-config.json`:

```json
{
  "workshops": {
    "title": "Workshops",
    "type": "list",
    "itemType": "workshop",
    "dataSource": "workshops.json",
    "component": "Workshops",
    "enabled": false,
    "showTitle": true
  }
}
```

Setting `"enabled": false` will hide the Workshops section completely.

## Example 3: Adding a Custom Section - "Certifications"

### Step 1: Create the data file `src/data/certifications.json`
```json
[
  {
    "name": "AWS Certified Solutions Architect",
    "organization": "Amazon Web Services",
    "date": "Mar 2023",
    "expiryDate": "Mar 2026",
    "credentialId": "ABC123XYZ",
    "link": "https://aws.amazon.com/certification/"
  },
  {
    "name": "Certified Kubernetes Administrator",
    "organization": "Cloud Native Computing Foundation",
    "date": "Jan 2023",
    "expiryDate": "Jan 2026",
    "credentialId": "CKA-2023-001",
    "link": "https://www.cncf.io/certification/cka/"
  }
]
```

### Step 2: Add the item type to `src/data/section-types.json`
```json
{
  "itemTypes": {
    // ... existing types ...
    "certification": {
      "fields": {
        "name": { "type": "string", "required": true, "display": "title" },
        "organization": { "type": "string", "required": true, "display": "subtitle" },
        "date": { "type": "string", "required": true, "display": "date" },
        "expiryDate": { "type": "string", "required": false, "display": "date-suffix" },
        "credentialId": { "type": "string", "required": false, "display": "description" },
        "link": { "type": "string", "required": false, "display": "link" }
      },
      "dateFormat": "date"
    }
  }
}
```

### Step 3: Add section config to `src/data/sections-config.json`
```json
{
  "sections": {
    // ... existing sections ...
    "certifications": {
      "title": "Certifications",
      "type": "list",
      "itemType": "certification",
      "dataSource": "certifications.json",
      "component": "Certifications",
      "enabled": true,
      "showTitle": true,
      "hasLeftAlignedEntries": false
    }
  }
}
```

### Step 4: Add to section order in `src/data/resume-config.json`
```json
{
  "sectionOrder": [
    "about",
    "experience", 
    "education",
    "certifications",
    "projects",
    "publications",
    "presentations",
    "workshops",
    "posters",
    "theses",
    "awards",
    "volunteering"
  ]
}
```

## Example 4: Customizing Field Display

You can create specialized item types for different use cases. For example, creating a "course" type for online courses:

### `src/data/section-types.json`
```json
{
  "course": {
    "fields": {
      "title": { "type": "string", "required": true, "display": "title" },
      "provider": { "type": "string", "required": true, "display": "subtitle" },
      "instructor": { "type": "string", "required": false, "display": "subtitle-suffix" },
      "completionDate": { "type": "string", "required": true, "display": "date" },
      "duration": { "type": "string", "required": false, "display": "description" },
      "certificate": { "type": "string", "required": false, "display": "link" }
    },
    "dateFormat": "completionDate"
  }
}
```

### `src/data/courses.json`
```json
[
  {
    "title": "Machine Learning Specialization",
    "provider": "Coursera",
    "instructor": "Andrew Ng",
    "completionDate": "Aug 2023",
    "duration": "3 months",
    "certificate": "https://coursera.org/certificate/ABC123"
  }
]
```

## Example 5: Creating Theme Variations

You can extend the system to support different themes by adding theme-specific configurations:

### `src/data/resume-config.json`
```json
{
  "title": "David Sarrat González - Resume",
  "sectionOrder": [...],
  "settings": {
    "showSectionNumbers": true,
    "compactMode": false,
    "theme": "academic",
    "dateFormat": "long",
    "showLogos": true
  }
}
```

## Example 6: Changing Profile Image Style

You can easily switch between circular and rectangular profile images by updating the configuration:

### Make Profile Image Circular
```json
// In src/data/images-config.json
{
  "profile": {
    "source": "david.jpeg",
    "circular": true,
    "sizes": {
      "thumbnail": "150x150",
      "medium": "300x300", 
      "large": "600x600"
    }
  }
}
```

### Keep Profile Image Rectangular (Current Default)
```json
// In src/data/images-config.json
{
  "profile": {
    "source": "david.jpeg",
    "circular": false,
    "sizes": {
      "thumbnail": "150x150",
      "medium": "300x300", 
      "large": "600x600"
    }
  }
}
```

### Override Per Component
You can also override the circular setting for individual image instances:

```jsx
// Force circular regardless of config
<OptimizedImage 
  type="profile" 
  size="medium" 
  circular={true}
  className="profile-image" 
/>

// Force rectangular regardless of config
<OptimizedImage 
  type="profile" 
  size="medium" 
  circular={false}
  className="profile-image" 
/>
```

This gives you maximum flexibility to use different styles in different contexts while maintaining a consistent default behavior.

## Example 7: Advanced Customization Features

### Custom Link Text and Labels

You can now customize how links are displayed:

```json
// In any data file (e.g., workshops.json)
{
  "title": "My Workshop",
  "site": "University",
  "date": "Jan 2024",
  "link": "https://example.com/workshop",
  "linkText": "Workshop Materials"  // Custom display text
}
```

This will render as: **Link:** [Workshop Materials](https://example.com/workshop)

### Flexible Line Configuration

Each item type now supports flexible line ordering and styling:

```json
// In src/data/section-types.json
{
  "displayLines": [
    { "field": "title", "type": "title", "order": 1 },
    { "field": "author", "type": "subtitle", "order": 2 },
    { "field": "event", "type": "subtitle", "order": 3 },
    { "field": "location", "type": "subtitle", "order": 3, "sameLine": true, "prefix": ", " },
    { "field": "description", "type": "description", "order": 4, "markdown": true }
  ]
}
```

Options:
- `order`: Determines display sequence
- `sameLine`: Combines with previous field on same line
- `prefix`: Text to add before the field value
- `italic`: Makes text italic
- `markdown`: Enables markdown processing

### Markdown Support

You can now use basic markdown in description fields:

```json
{
  "description": "**Research focus:** Federated analysis\n\n**Key responsibilities:**\n- Development of software packages\n- ****Implementation**** of protocols\n- Collaboration with researchers"
}
```

Supported markdown:
- `**text**` → **bold text**
- `****text****` → **bold text** (alternative)
- `- item` → Bulleted lists
- `\n\n` → Paragraph breaks

### Custom Link Labels

Configure link labels for different types:

```json
// In section-types.json
{ "field": "doi", "type": "link", "label": "DOI" }
{ "field": "link", "type": "link", "label": "Website", "customText": true }
{ "field": "uri", "type": "link", "label": "Repository" }
```

### Optional About Me Section

The About Me section is now fully configurable:

```json
// In sections-config.json
{
  "about": {
    "enabled": true,               // Show/hide section
    "showTitle": true,            // Show "About Me" title
    "showOnlyWithDescription": true // Only show if description exists
  }
}
```

### Combining Multiple Fields on One Line

Create complex subtitle combinations:

```json
{
  "displayLines": [
    { "field": "degree", "type": "title", "order": 1 },
    { "field": "fieldOfStudy", "type": "subtitle", "order": 2, "prefix": " in " },
    { "field": "university", "type": "subtitle", "order": 2, "sameLine": true },
    { "field": "location", "type": "subtitle", "order": 2, "sameLine": true, "prefix": ", " }
  ]
}
```

This renders as: "Master's Degree in Computer Science, University Name, Barcelona"

### Complete Example: Customizing Publications

```json
{
  "displayLines": [
    { "field": "title", "type": "title", "order": 1 },
    { "field": "authors", "type": "subtitle", "order": 2 },
    { "field": "journal", "type": "subtitle", "order": 3, "italic": true },
    { "field": "doi", "type": "link", "order": 4, "label": "DOI" }
  ]
}
```

This creates a publication with:
1. Title as main heading
2. Authors on line 2
3. Journal name in italics on line 3  
4. DOI link with "DOI:" label on line 4

## Benefits of This Approach

1. **No Code Changes**: All customizations are done through JSON configuration
2. **Instant Updates**: Changes to JSON files are reflected immediately
3. **Maintainable**: Clear separation between data and presentation
4. **Extensible**: Easy to add new section types and fields
5. **Consistent**: All sections automatically follow the same visual patterns
6. **Version Control Friendly**: Easy to track changes to resume content

## Quick Customization Checklist

- [ ] Reorder sections in `resume-config.json`
- [ ] Enable/disable sections in `sections-config.json`
- [ ] Update data files with your content
- [ ] Add custom sections if needed
- [ ] Test the application to verify changes

The system is designed to be intuitive and powerful, allowing you to focus on content rather than code structure. 