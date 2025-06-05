# My personal website

This project showcases my professional experience, education, projects, publications, and more in a minimalistic and responsive design. The website is built using React and is optimized for both desktop and mobile devices.

## Features

- **Minimalistic design**: Clean and simple layout to highlight the most important information.
- **Responsive**: Fully responsive design that works seamlessly on both desktop and mobile devices.
- **Easy to update**: All the information displayed on the website can be easily modified through JSON files located in the `src/data` directory.
- **PDF Generation**: Automatically generates A4-formatted PDF resumes with text-selectable content.

## Demo

You can view the live demo of the website [here](https://davidsarratgonzalez.github.io).

## Getting started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/davidsarratgonzalez/davidsarratgonzalez.github.io.git
    cd davidsarratgonzalez.github.io
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Running the development server

To start the development server, run:

```bash
npm start
```

This will start the React development server and open the website in your default browser. Any changes you make to the code will automatically reload the page.

### Building for production

To create a production build of the website, run:

```bash
npm run build
```

This will generate a `build` directory with the optimized production files.

### Building with PDF Generation

To create a production build that also generates a PDF resume, run:

```bash
npm run build:pdf
```

This will:
1. Build optimized images
2. Create the production build
3. Generate an A4-formatted PDF resume
4. Save the PDF as `build/[name]_resume.pdf`

### Deploying to GitHub Pages

This project is configured to deploy directly to GitHub Pages. To deploy the website, run:

```bash
npm run deploy
```

This will build the project (including PDF generation) and push the contents of the `build` directory to the `gh-pages` branch of your repository.

## Modifying the content

All the content displayed on the website can be modified through JSON files located in the `src/data` directory. Simply update the relevant JSON file with your information, and the website will reflect the changes.

## Configurable Resume System

This application uses a fully configurable JSON-based system for managing resume sections. This allows you to easily customize the content, order, and types of sections without modifying the React components.

### Configuration Files Overview

#### 1. `src/data/section-types.json`
Defines the different types of resume items and their field schemas. Each item type specifies:
- Field names and types
- Which fields are required
- How fields should be displayed (title, subtitle, date, link, etc.)
- Date formatting rules

#### 2. `src/data/sections-config.json`
Configures each section's properties:
- Section title
- Data source file
- Item type to use
- Visual styling options
- Whether the section is enabled

#### 3. `src/data/resume-config.json`
Master configuration file that controls:
- Section order
- Global settings
- Application title

### Supported Item Types

#### Job/Experience Items
```json
{
  "jobTitle": "string",
  "company": "string", 
  "startDate": "string",
  "endDate": "string (optional)",
  "logo": "string (optional)",
  "description": "string (optional)"
}
```

#### Education Items
```json
{
  "degree": "string",
  "fieldOfStudy": "string",
  "university": "string",
  "startDate": "string",
  "endDate": "string (optional)",
  "logo": "string (optional)",
  "description": "string (optional)"
}
```

#### Publication Items
```json
{
  "title": "string",
  "authors": "string",
  "journal": "string",
  "month": "string",
  "year": "string",
  "doi": "string (optional)"
}
```

#### Project Items
```json
{
  "name": "string",
  "description": "string (optional)",
  "technologies": "string (optional)",
  "link": "string (optional)",
  "date": "string (optional)"
}
```

#### Award Items
```json
{
  "title": "string",
  "description": "string (optional)",
  "organization": "string",
  "date": "string",
  "link": "string (optional)"
}
```

#### Thesis Items
```json
{
  "title": "string",
  "author": "string",
  "degree": "string",
  "date": "string",
  "uri": "string (optional)"
}
```

#### Presentation Items
```json
{
  "title": "string",
  "event": "string",
  "location": "string (optional)",
  "date": "string",
  "link": "string (optional)"
}
```

#### Workshop Items
```json
{
  "title": "string",
  "site": "string",
  "date": "string",
  "link": "string (optional)"
}
```

#### Poster Items
```json
{
  "title": "string",
  "authors": "string",
  "event": "string",
  "location": "string (optional)",
  "date": "string",
  "link": "string (optional)"
}
```

#### Volunteering Items
```json
{
  "position": "string",
  "organization": "string",
  "startDate": "string",
  "endDate": "string (optional)",
  "logo": "string (optional)",
  "description": "string (optional)"
}
```

#### Personal Info
```json
{
  "name": "string",
  "title": "string",
  "profileImage": "string (optional)",
  "linkedin": "string (optional)",
  "github": "string (optional)",
  "orcid": "string (optional)",
  "website": "string (optional)",
  "description": "string (optional)"
}
```

### How to Customize

#### Adding a New Section
1. Create a JSON data file in `src/data/`
2. Add a section configuration in `src/data/sections-config.json`
3. Add the section key to the `sectionOrder` array in `src/data/resume-config.json`

#### Reordering Sections
Simply rearrange the section keys in the `sectionOrder` array in `src/data/resume-config.json`.

#### Disabling a Section
Set `"enabled": false` in the section's configuration in `src/data/sections-config.json`.

#### Creating a New Item Type
1. Add the new item type definition to `src/data/section-types.json`
2. Create corresponding data files
3. Update sections configuration to use the new item type

### Visual Customization

The system maintains all existing CSS styles and visual appearance. Special styling options include:

- `hasLeftAlignedEntries`: Adds left-aligned styling for sections like Experience and Education
- `showTitle`: Controls whether the section title is displayed
- `showInHeader`: For special sections like About that appear in the header

### Advanced Features

#### Flexible Line Configuration
Each section type supports configurable display lines with:
- **Custom ordering**: Control the sequence of information
- **Same-line combinations**: Combine multiple fields on one line
- **Italic styling**: Mark specific lines as italic
- **Prefix text**: Add custom text before field values

#### Smart Link System
- **Custom link text**: Override default URL display text
- **Configurable labels**: "DOI:", "Website:", "Repository:", etc.
- **URL processing**: Automatic handling of different link types

#### Markdown Support
Basic markdown processing in description fields:
- **Bold text**: `**text**` and `****text****`
- **Bulleted lists**: Lines starting with `- `
- **Paragraph breaks**: Double newlines

#### Optional Sections
- **About Me section**: Fully configurable and optional
- **Conditional display**: Show sections only when content exists
- **Flexible titles**: Show/hide section titles as needed

### Benefits

- **Easy Content Management**: Update resume content by editing JSON files
- **Flexible Structure**: Add new sections or item types without touching React components
- **Consistent Styling**: All sections use the same visual patterns automatically
- **Maintainable**: Clear separation between data, configuration, and presentation logic
- **Future-Proof**: Easy to extend with new features or section types
- **Maximum Customization**: Control every aspect of how content is displayed

## Image Management System

The application includes an advanced image management system that automatically optimizes images and generates favicons during the build process.

### Features

- **Automatic Image Optimization**: Profile images are generated in multiple sizes and formats
- **WebP Support**: Modern browsers get WebP images for better performance
- **Favicon Generation**: Automatically generates all necessary favicon sizes and formats
- **Lazy Loading**: Images load only when needed to improve performance
- **Responsive Images**: Different image sizes for different use cases

### Image Configuration

Images are configured in `src/data/images-config.json`:

- **Profile Images**: Automatically generated in thumbnail (150x150), medium (300x300), and large (600x600) sizes
- **Circular Images**: Optional circular/round styling for profile images (configurable)
- **Organization Logos**: Optimized with configurable quality settings
- **Favicons**: Generated from the profile image in all required sizes and formats

### Build Process

The image optimization runs automatically before each build:

```bash
npm run build        # Builds images then the app
npm run build:images # Builds images only
```

### Generated Assets

- **Profile images**: `david-thumbnail.jpeg`, `david-medium.jpeg`, `david-large.jpeg`, and WebP versions
- **Favicons**: Complete set of favicons in `/public/favicons/` and root compatibility files
- **Optimized logos**: All organization logos are compressed for better performance

### Adding New Images

1. Add the image file to `/public/images/`
2. Update `src/data/images-config.json` with the new image configuration
3. Run `npm run build:images` to optimize the new image

### Configuring Circular Profile Images

To make the profile image circular/round, set the `circular` option in `src/data/images-config.json`:

```json
{
  "profile": {
    "source": "profile.jpg",
    "circular": true,
    "sizes": { ... }
  }
}
```

You can also override this per component:

```jsx
<OptimizedImage 
  type="profile" 
  size="medium" 
  circular={true}
  className="profile-image" 
/>
```

## PDF Generation

This project includes an advanced PDF generation system that creates professional A4-formatted resumes with text-selectable content (not images). The PDF is automatically generated during the build process and uses the person's name from the configuration for the filename.

### Key Features

- **Real PDF with selectable text** using Puppeteer
- **A4 format** with optimized margins and typography
- **Dynamic filename** based on person's name from `about.json`
- **Integrated with deployment** process
- **Print-optimized styling** while maintaining visual consistency
- **Professional formatting** with proper page breaks and font sizing

### Usage

Generate PDF only:
```bash
npm run build:pdf
```

The PDF will be saved as `build/[firstname_lastname]_resume.pdf`.

For complete documentation about PDF generation, configuration, and troubleshooting, see [PDF Generation Documentation](PDF-GENERATION.md).

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Acknowledgements

- Built with [React](https://reactjs.org/)
- Deployed using [GitHub Pages](https://pages.github.com/)
