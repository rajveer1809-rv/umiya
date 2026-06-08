const { Jimp } = require('jimp');

async function run() {
  const imagePath = 'c:\\Users\\Acer\\Downloads\\ChatGPT Image Jun 8, 2026, 05_27_12 PM.png';
  console.log(`Loading image from ${imagePath}...`);
  const image = await Jimp.read(imagePath);
  console.log(`Image dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
}

run().catch(console.error);
