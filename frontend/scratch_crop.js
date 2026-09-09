const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const inputPath = path.join(__dirname, 'public', 'idq_logo.png');
  const outputPath = path.join(__dirname, 'app', 'icon.png');
  const faviconPath = path.join(__dirname, 'app', 'favicon.ico');

  try {
    // 1. Trim the transparent pixels from the whole logo first to get exact bounds
    const { data, info } = await sharp(inputPath)
      .trim()
      .toBuffer({ resolveWithObject: true });

    // 2. The shape is on the left. It's a hexagon.
    // The height of the trimmed image will dictate the size of the square we want from the left.
    // We'll crop a square of size info.height x info.height from the left edge (x=0).
    const size = info.height;
    
    await sharp(data)
      .extract({ left: 0, top: 0, width: size, height: size })
      .toFile(outputPath);

    console.log('Successfully cropped the logo shape to app/icon.png');
    
    // Also delete the old favicon.ico if it exists, since Next.js prefers icon.png when present,
    // but just to be safe we'll remove it.
    const fs = require('fs');
    if (fs.existsSync(faviconPath)) {
      fs.unlinkSync(faviconPath);
      console.log('Deleted old app/favicon.ico');
    }
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
