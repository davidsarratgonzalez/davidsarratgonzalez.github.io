const { spawn } = require('child_process');
const path = require('path');
const generatePDF = require('./build-pdf');

function runCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Running: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function buildWithPDF() {
  try {
    console.log('🚀 Starting build process with PDF generation...\n');

    // Step 1: Build images
    console.log('📸 Building optimized images...');
    await runCommand('node', ['scripts/build-images.js']);
    console.log('✅ Images built successfully\n');

    // Step 2: Build React app
    console.log('⚛️  Building React application...');
    await runCommand('npm', ['run', 'build-only']);
    console.log('✅ React build completed\n');

    // Step 3: Start a temporary server
    console.log('🌐 Starting temporary server for PDF generation...');
    const serverProcess = spawn('npx', ['serve', '-s', 'build', '-p', '3000', '--no-clipboard'], {
      stdio: 'pipe',
      shell: true
    });

    // Wait for server to be ready by polling
    const maxAttempts = 30;
    let serverReady = false;

    for (let i = 0; i < maxAttempts; i++) {
      try {
        const http = require('http');
        await new Promise((resolve, reject) => {
          const req = http.get('http://localhost:3000', (res) => {
            if (res.statusCode === 200) {
              resolve();
            } else {
              reject(new Error(`Status ${res.statusCode}`));
            }
          });
          req.on('error', reject);
          req.setTimeout(2000, () => {
            req.destroy();
            reject(new Error('Timeout'));
          });
        });
        serverReady = true;
        break;
      } catch (e) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    if (!serverReady) {
      throw new Error('Server failed to start after 30 seconds');
    }

    console.log('🌐 Server is ready at http://localhost:3000');

    // Step 4: Generate PDF
    console.log('📄 Generating PDF...');
    process.env.PDF_URL = 'http://localhost:3000';
    await generatePDF();
    console.log('✅ PDF generated successfully\n');

    // Step 5: Stop server
    console.log('🛑 Stopping temporary server...');
    serverProcess.kill();
    
    console.log('🎉 Build with PDF completed successfully!');
    console.log('📁 Files available in ./build/ directory');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  buildWithPDF();
}

module.exports = buildWithPDF; 