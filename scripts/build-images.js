const sharp = require('sharp');
const { favicons } = require('favicons');
const fs = require('fs-extra');
const path = require('path');
const imagesConfig = require('../src/data/images-config.json');

const sourceDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public');
const faviconOutputDir = path.join(__dirname, '../public/favicons');

// Ensure output directories exist
async function ensureDirectories() {
  await fs.ensureDir(faviconOutputDir);
  console.log('📁 Created output directories');
}

// Generate favicons from profile image
async function generateFavicons() {
  try {
    console.log('🎨 Generating favicons...');
    
    const faviconConfig = imagesConfig.favicon;
    const sourcePath = path.join(sourceDir, faviconConfig.source);
    
    // Check if source image exists
    if (!await fs.pathExists(sourcePath)) {
      console.error(`❌ Source image not found: ${sourcePath}`);
      return;
    }

    const faviconOptions = {
      path: '/favicons/',
      appName: 'David Sarrat González',
      appShortName: 'DSarrat',
      appDescription: 'Personal website and resume of David Sarrat González',
      developerName: 'David Sarrat González',
      developerURL: 'https://davidsarrat.github.io',
      dir: 'auto',
      lang: 'en-US',
      background: faviconConfig.background || '#ffffff',
      theme_color: '#000000',
      appleStatusBarStyle: 'black-translucent',
      display: 'standalone',
      orientation: 'any',
      scope: '/',
      start_url: '/',
      version: '1.0',
      logging: false,
      pixel_art: false,
      loadManifestWithCredentials: false,
      manifestMaskable: false,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
        yandex: true
      }
    };

    const response = await favicons(sourcePath, faviconOptions);
    
    // Write favicon files
    await Promise.all(
      response.images.map(async (image) => {
        const imagePath = path.join(faviconOutputDir, image.name);
        await fs.writeFile(imagePath, image.contents);
      })
    );

    // Write favicon files to root for compatibility
    const rootFavicons = ['favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png'];
    await Promise.all(
      response.images
        .filter(image => rootFavicons.includes(image.name))
        .map(async (image) => {
          const imagePath = path.join(outputDir, image.name);
          await fs.writeFile(imagePath, image.contents);
        })
    );

    // Write manifest and other files
    await Promise.all([
      ...response.files.map(async (file) => {
        const filePath = path.join(faviconOutputDir, file.name);
        await fs.writeFile(filePath, file.contents);
      }),
      // Write root manifest for compatibility
      fs.writeFile(
        path.join(outputDir, 'site.webmanifest'),
        response.files.find(f => f.name === 'manifest.json')?.contents || '{}'
      )
    ]);

    console.log(`✅ Generated ${response.images.length} favicon images and ${response.files.length} manifest files`);
    
    // Generate HTML meta tags for reference
    const htmlPath = path.join(faviconOutputDir, 'favicon-meta.html');
    await fs.writeFile(htmlPath, response.html.join('\n'));
    console.log('📝 Generated favicon meta tags reference file');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

// Optimize profile image with different sizes
async function optimizeProfileImage() {
  try {
    console.log('🖼️  Optimizing profile image...');
    
    const profileConfig = imagesConfig.profile;
    const sourcePath = path.join(sourceDir, profileConfig.source);
    
    if (!await fs.pathExists(sourcePath)) {
      console.error(`❌ Profile image not found: ${sourcePath}`);
      return;
    }

    const sizes = profileConfig.sizes;
    const quality = profileConfig.quality || 85;
    
    for (const [sizeName, dimensions] of Object.entries(sizes)) {
      const [width, height] = dimensions.split('x').map(Number);
      
      // Generate JPEG version
      const jpegPath = path.join(sourceDir, `david-${sizeName}.jpeg`);
      await sharp(sourcePath)
        .resize(width, height, { fit: 'cover', position: 'center' })
        .jpeg({ quality })
        .toFile(jpegPath);
      
      // Generate WebP version if supported
      if (profileConfig.formats.includes('webp')) {
        const webpPath = path.join(sourceDir, `david-${sizeName}.webp`);
        await sharp(sourcePath)
          .resize(width, height, { fit: 'cover', position: 'center' })
          .webp({ quality })
          .toFile(webpPath);
      }
    }
    
    console.log(`✅ Generated ${Object.keys(sizes).length} profile image sizes`);
  } catch (error) {
    console.error('❌ Error optimizing profile image:', error);
  }
}

// Optimize organization logos
async function optimizeLogos() {
  try {
    console.log('🏢 Optimizing organization logos...');
    
    const logos = imagesConfig.logos.organizations;
    let optimizedCount = 0;
    
    for (const [orgKey, logoConfig] of Object.entries(logos)) {
      const sourcePath = path.join(sourceDir, logoConfig.source);
      
      if (!await fs.pathExists(sourcePath)) {
        console.warn(`⚠️  Logo not found: ${sourcePath}`);
        continue;
      }

      const quality = logoConfig.quality || 80;
      const outputPath = path.join(sourceDir, logoConfig.source);
      
      // Optimize the logo in-place
      await sharp(sourcePath)
        .jpeg({ quality, progressive: true })
        .toFile(outputPath + '.tmp');
      
      await fs.move(outputPath + '.tmp', outputPath, { overwrite: true });
      optimizedCount++;
    }
    
    console.log(`✅ Optimized ${optimizedCount} organization logos`);
  } catch (error) {
    console.error('❌ Error optimizing logos:', error);
  }
}

// Main function
async function buildImages() {
  console.log('🚀 Starting image build process...\n');
  
  try {
    await ensureDirectories();
    await generateFavicons();
    await optimizeProfileImage();
    await optimizeLogos();
    
    console.log('\n🎉 Image build process completed successfully!');
  } catch (error) {
    console.error('\n❌ Image build process failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildImages();
}

module.exports = { buildImages };
