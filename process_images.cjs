const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function makeTransparent(inputPath, outputPath, threshold = 245) {
  console.log(`Processing ${inputPath}...`);
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  const visited = Array.from({ length: width }, () => new Array(height).fill(false));
  const queue = [];

  // Seed boundary
  for (let x = 0; x < width; x++) {
    addSeed(x, 0);
    addSeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    addSeed(0, y);
    addSeed(width - 1, y);
  }

  function intToRGBA(hex) {
    return {
      r: (hex >>> 24) & 0xff,
      g: (hex >>> 16) & 0xff,
      b: (hex >>> 8) & 0xff,
      a: hex & 0xff
    };
  }

  function addSeed(x, y) {
    if (visited[x][y]) return;
    const color = intToRGBA(image.getPixelColor(x, y));
    if (color.r >= threshold && color.g >= threshold && color.b >= threshold) {
      visited[x][y] = true;
      queue.push({ x, y });
    }
  }

  let count = 0;
  while (queue.length > 0) {
    const { x, y } = queue.shift();
    
    // Set to transparent
    image.setPixelColor(0x00000000, x, y); // RGBA all 0
    count++;

    // Check neighbors
    const neighbors = [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y + 1 },
      { x, y: y - 1 }
    ];

    for (const n of neighbors) {
      if (n.x >= 0 && n.x < width && n.y >= 0 && n.y < height) {
        if (!visited[n.x][n.y]) {
          const color = intToRGBA(image.getPixelColor(n.x, n.y));
          if (color.r >= threshold - 15 && color.g >= threshold - 15 && color.b >= threshold - 15) {
            visited[n.x][n.y] = true;
            queue.push(n);
          }
        }
      }
    }
  }

  console.log(`Made ${count} pixels transparent.`);

  // Auto crop to remove extra transparent space
  image.autocrop();

  await image.write(outputPath);
  console.log(`Saved transparent image to ${outputPath}`);
}

async function run() {
  const artifactDir = 'C:\\Users\\Acer\\.gemini\\antigravity-cli\\brain\\d95ff06d-13dc-4e02-98c9-aa9c5aa5f809';
  const outDir = 'E:\\sp\\umiya\\public\\images';
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs.readdirSync(artifactDir);
  const coffeeTableFile = files.find(f => f.startsWith('coffee_table') && f.endsWith('.png'));
  const floorLampFile = files.find(f => f.startsWith('floor_lamp') && f.endsWith('.png'));

  if (coffeeTableFile) {
    await makeTransparent(path.join(artifactDir, coffeeTableFile), path.join(outDir, 'coffee_table.png'), 245);
  } else {
    console.error("Coffee table file not found!");
  }

  if (floorLampFile) {
    await makeTransparent(path.join(artifactDir, floorLampFile), path.join(outDir, 'floor_lamp.png'), 245);
  } else {
    console.error("Floor lamp file not found!");
  }
}

run().catch(console.error);
