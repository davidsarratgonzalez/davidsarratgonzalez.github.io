const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

async function generatePDF() {
  try {
    // Read the name from about.json to create dynamic filename
    const aboutPath = path.join(__dirname, '../src/data/about.json');
    const aboutData = JSON.parse(await fs.readFile(aboutPath, 'utf8'));
    const personName = aboutData.name || 'Resume';
    
    // Create safe filename (convert accents to ASCII and remove special characters)
    const safeFileName = personName
      .normalize('NFD')                    // Decompose accented characters (á → a + ´)
      .replace(/[\u0300-\u036f]/g, '')     // Remove diacritical marks
      .replace(/[^a-zA-Z0-9\s-]/g, '')     // Remove remaining special characters
      .replace(/\s+/g, '_')                // Replace spaces with underscores
      .toLowerCase();

    console.log(`🚀 Generating PDF for: ${personName}`);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set smaller viewport for PDF rendering with reduced scale
    await page.setViewport({
      width: 900,
      height: 1200,
      deviceScaleFactor: 0.6
    });

    // Navigate to the local development server or build, using a hash to hide elements
    const url = (process.env.PDF_URL || 'http://localhost:3000') + '#no-download';
    console.log(`📄 Loading page: ${url}`);
    
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // Scroll gradually to trigger loading of all images
    console.log('📜 Scrolling to load all images...');
    try {
      await page.evaluate(() => {
        return new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 200;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if(totalHeight >= scrollHeight * 1.2){
              clearInterval(timer);
              window.scrollTo(0, 0);
              setTimeout(resolve, 1000);
            }
          }, 200);
        });
      });
    } catch (error) {
      console.log('⚠️  Scroll error (continuing anyway):', error.message);
    }

    // Get image count and wait for images
    console.log('🖼️  Checking image loading...');
    try {
      const imageCount = await page.evaluate(() => document.images.length);
      console.log(`📊 Found ${imageCount} images on page`);
      
      // Wait for images with simpler approach
      await page.waitForFunction(
        () => {
          const images = Array.from(document.images);
          const loadedImages = images.filter(img => img.complete);
          return loadedImages.length === images.length;
        },
        { timeout: 15000 }
      );
      console.log('✅ All images loaded');
    } catch (error) {
      console.log('⚠️  Image loading timeout (continuing anyway):', error.message);
    }

    // Wait additional time for any dynamic content to load
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Minimal PDF-specific CSS - only what's absolutely necessary
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 20mm 0 20mm 0;
        }
        
        @page:first {
          margin: 0 0 20mm 0;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        .App {
          margin: 0 !important;
          max-width: none !important;
          padding: 15mm 20mm 0mm 20mm !important;
        }
        
        /* Allow page breaks between entries */
        .entry {
          page-break-inside: avoid;
          page-break-after: auto;
        }
        
        /* Prevent breaking sections in the middle */
        h2 {
          page-break-after: avoid;
          page-break-before: auto;
        }
        
        /* Add some breathing room between sections that cross pages */
        section {
          page-break-inside: auto;
          margin-bottom: 15px;
        }
        
        /* Exact 1:1 font sizes matching web */
        .header-center h1 {
          font-size: 24px !important;
        }
        
        .header-subtitle {
          font-size: 18px !important;
        }
        
        h2 {
          font-size: 18px !important;
          border-bottom: none !important;
          position: relative;
        }
        
        .entry-title {
          font-size: 16px !important;
        }
        
        .entry-subtitle {
          font-size: 16px !important;
        }
        
        .entry-description {
          font-size: 15px !important;
        }
        
        .entry-date {
          font-size: 15px !important;
        }
        
        .social-links a {
          font-size: 15px !important;
        }
        
        p {
          font-size: 16px !important;
        }
        
        .markdown-content p {
          font-size: 16px !important;
        }
        
        /* Ultra-thin lines */
        h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.3px;
          background: #000;
        }
        
        .header-divider {
          border: none !important;
          height: 0.3px !important;
          background: #000 !important;
          margin: 5px auto !important;
        }
        
        /* Keep links without underline like the website */
        a {
          text-decoration: none !important;
        }
        
        a:hover {
          text-decoration: none !important;
        }
      `
    });

    console.log('📋 Generating PDF...');
    
    // Generate PDF with A4 format and reduced scale
    const pdfBuffer = await page.pdf({
      format: 'A4',
      scale: 0.8,
      margin: {
        top: '0mm',
        right: '0mm', 
        bottom: '0mm',
        left: '0mm'
      },
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false
    });

    await browser.close();

    // Ensure build directory exists
    const buildDir = path.join(__dirname, '../build');
    try {
      await fs.access(buildDir);
    } catch {
      await fs.mkdir(buildDir, { recursive: true });
    }

    // Save PDF to build directory
    const pdfPath = path.join(buildDir, `${safeFileName}_resume.pdf`);
    await fs.writeFile(pdfPath, pdfBuffer);

    console.log(`✅ PDF generated successfully: ${pdfPath}`);
    console.log(`📦 File size: ${(pdfBuffer.length / 1024 / 1024).toFixed(2)} MB`);
    
    // Create a download redirect page
    const pdfFileName = path.basename(pdfPath);
    const downloadPageContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=/${pdfFileName}">
  <title>Redirecting to resume...</title>
  <script>
    window.location.href = '/${pdfFileName}';
  </script>
</head>
<body>
  <p>
    Downloading resume... If your download does not start automatically, 
    <a href="/${pdfFileName}">click here</a>.
  </p>
</body>
</html>`;

    const downloadDir = path.join(buildDir, 'download');
    await fs.mkdir(downloadDir, { recursive: true });
    const downloadPagePath = path.join(downloadDir, 'index.html');
    await fs.writeFile(downloadPagePath, downloadPageContent);

    console.log(`✅ Created download redirect page: ${downloadPagePath}`);
    
    return pdfPath;
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generatePDF();
}

module.exports = generatePDF; 