const sharp = require('sharp');
const path = require('path');

async function removeBackground() {
  const inputPath = path.join(__dirname, 'public', 'idq_logo.png');
  const outputPath = path.join(__dirname, 'app', 'icon.png');

  try {
    // 1. Get exact bounds of the whole logo by trimming white space
    // We can trim by specifying a threshold for background color
    const { data, info } = await sharp(inputPath)
      .trim({ background: { r: 255, g: 255, b: 255, alpha: 1 }, threshold: 10 })
      .toBuffer({ resolveWithObject: true });

    // 2. Crop the square from the left edge (the hexagon shape)
    const size = info.height;
    
    // 3. Process the cropped image to remove the white background
    const croppedBuffer = await sharp(data)
      .extract({ left: 0, top: 0, width: size, height: size })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixelData = croppedBuffer.data;
    
    // Iterate through pixels and make white/light pixels transparent
    // To handle anti-aliasing gently, we make pixels partially transparent
    // based on how close they are to white (255)
    for (let i = 0; i < pixelData.length; i += 4) {
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
      
      const brightness = (r + g + b) / 3;
      
      if (brightness > 240) {
        // Pure or near pure white becomes fully transparent
        pixelData[i + 3] = 0; 
      } else {
        // It's part of the logo (either solid or anti-aliased edge)
        // Accent Red: #e60023 (R: 230, G: 0, B: 35)
        pixelData[i] = 230;
        pixelData[i+1] = 0;
        pixelData[i+2] = 35;
        
        // Handle anti-aliasing transparency
        if (brightness > 150) {
          const alpha = Math.floor(255 * (1 - (brightness - 150) / (240 - 150)));
          pixelData[i + 3] = alpha;
        } else {
          pixelData[i + 3] = 255;
        }
      }
    }

    // Save the new transparent image
    await sharp(pixelData, {
      raw: {
        width: size,
        height: size,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log('Successfully removed white background and updated app/icon.png');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

removeBackground();
