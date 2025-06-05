# PDF Generation System

This project includes an advanced PDF generation system that creates A4-formatted resume PDFs directly from the web version with **text-selectable content** (not images).

## Features

- 📄 **Real PDF with selectable text** - Uses Puppeteer to generate actual PDFs, not images
- 🎯 **A4 format optimization** - Automatically formatted for DIN A4 paper size
- 🏷️ **Dynamic naming** - PDF filename based on person's name from `about.json`
- 🔧 **Production integration** - Automatically builds and deploys with GitHub Pages
- 🎨 **Font consistency** - Maintains Times New Roman and all visual styling
- 📏 **Print optimization** - Adjusted margins, font sizes, and layout for print

## Usage

### Generate PDF Only
```bash
npm run build:pdf
```

This command will:
1. Build optimized images
2. Build the React application
3. Start a temporary server
4. Generate the PDF
5. Save to `build/[name]_resume.pdf`

### Manual PDF Generation
```bash
# Start development server
npm start

# In another terminal, generate PDF from local server
node scripts/build-pdf.js
```

## Generated Files

The PDF is automatically saved to:
```
build/[firstname_lastname]_resume.pdf
```

For example: `david_sarrat_gonzlez_resume.pdf`

## PDF Specifications

### Format
- **Paper Size**: DIN A4 (210 × 297 mm)
- **Margins**: 15mm top/bottom, 20mm left/right
- **Orientation**: Portrait
- **Quality**: High resolution (2x device scale factor)

### Font Optimization
- **Header Name**: 22px
- **Header Subtitle**: 16px  
- **Section Titles**: 16px
- **Entry Titles**: 15px
- **Content Text**: 12px
- **Social Links**: 12px

### Layout Adjustments
- **Profile Image**: Reduced to 100px × 100px
- **Organization Logos**: Reduced to 40px × 40px
- **Margins**: Optimized for print
- **Page Breaks**: Prevented within entries and sections
- **Links**: Visible with underlines for print

## Integration with Deploy

The PDF generation is automatically integrated with the deployment process:

```json
{
  "scripts": {
    "predeploy": "npm run build:pdf",
    "deploy": "gh-pages -d build"
  }
}
```

When you run `npm run deploy`, it will:
1. Generate the PDF 
2. Deploy both the website and PDF to GitHub Pages

## Technical Details

### Dependencies
- **puppeteer**: PDF generation engine
- **serve**: Temporary server for rendering

### PDF Generation Process
1. Launches headless Chrome browser
2. Loads the built website with `?pdf=true` parameter
3. Applies print-specific CSS optimizations
4. Generates A4 PDF with proper margins
5. Saves with dynamic filename based on person's name

### CSS Optimizations
The system automatically applies print-specific styles:

```css
@media print {
  .App {
    max-width: none !important;
    padding: 15mm 20mm 15mm 20mm !important;
  }
  
  .entry {
    page-break-inside: avoid;
  }
  
  .social-icons {
    display: none !important;
  }
}
```

## Configuration

### Custom PDF Styling
To customize PDF appearance, modify the CSS in `scripts/build-pdf.js`:

```javascript
await page.addStyleTag({
  content: `
    @media print {
      /* Your custom print styles */
    }
  `
});
```

### PDF Server URL
Set a custom URL for PDF generation:

```bash
PDF_URL=http://localhost:8080 node scripts/build-pdf.js
```

## Troubleshooting

### Common Issues

1. **"Command failed with exit code 1"**
   - Ensure port 3000 is available
   - Check if all dependencies are installed

2. **"page.waitForTimeout is not a function"**
   - Update Puppeteer to latest version
   - Already fixed in current implementation

3. **PDF missing images**
   - Run `npm run build:images` first
   - Ensure all images are in `/public/images/`

4. **Fonts not rendering correctly**
   - Verify Times New Roman is available on system
   - Check print CSS media queries

### Debug Mode
To debug PDF generation:

```javascript
// In scripts/build-pdf.js, set headless: false
const browser = await puppeteer.launch({
  headless: false, // Shows browser window
  args: ['--no-sandbox']
});
```

## Benefits

- ✅ **Professional PDFs** - High-quality, print-ready documents
- ✅ **Text Searchable** - All content is selectable and searchable
- ✅ **Automated** - No manual PDF creation needed
- ✅ **Consistent** - Always matches website appearance
- ✅ **Dynamic** - Updates automatically with content changes
- ✅ **Version Control** - PDF generation is part of the codebase

## Example Output

The generated PDF includes:
- Header with profile image, name, title, and contact info
- All enabled sections from the resume configuration
- Properly formatted education, experience, projects, publications
- Working links (underlined for print)
- Optimized typography and spacing for A4 format 