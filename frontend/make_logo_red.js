const sharp = require('sharp');
const path = require('path');

async function makeLogoRed() {
  const inputPath = path.join(__dirname, 'public', 'idq_logo.png');
  const outputPath = path.join(__dirname, 'public', 'idq_logo_red.png');

  try {
    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixelData = data;
    
    for (let i = 0; i < pixelData.length; i += 4) {
      const x = (i / 4) % info.width;
      const r = pixelData[i];
      const g = pixelData[i + 1];
      const b = pixelData[i + 2];
      const a = pixelData[i + 3];
      
      const brightness = (r + g + b) / 3;
      
      // If it's a dark pixel (the logo), check if it's on the left side
      if (brightness < 200 && a > 0) {
        // The image width is roughly 3878. The shape is the first 1790 pixels.
        // We tint if it is in the first 45% of the image.
        if (x < info.width * 0.45) {
          const intensity = 1 - (brightness / 200);
          pixelData[i] = Math.floor(r + (230 - r) * intensity);
          pixelData[i+1] = Math.floor(g + (0 - g) * intensity);
          pixelData[i+2] = Math.floor(b + (35 - b) * intensity);
        }
      }
    }

    await sharp(pixelData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log('Successfully created red logo: idq_logo_red.png');
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

makeLogoRed();
