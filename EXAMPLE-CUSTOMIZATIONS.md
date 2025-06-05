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