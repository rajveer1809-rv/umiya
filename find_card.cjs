const { Jimp } = require('jimp');

function colorDiff(c1, c2) {
  const r1 = (c1 >>> 24) & 0xff;
  const g1 = (c1 >>> 16) & 0xff;
  const b1 = (c1 >>> 8) & 0xff;
  
  const r2 = (c2 >>> 24) & 0xff;
  const g2 = (c2 >>> 16) & 0xff;
  const b2 = (c2 >>> 8) & 0xff;

  return Math.sqrt((r1 - r2)**2 + (g1 - g2)**2 + (b1 - b2)**2);
}

async function run() {
  const imagePath = 'c:\\Users\\Acer\\Downloads\\ChatGPT Image Jun 8, 2026, 05_27_12 PM.png';
  const image = await Jimp.read(imagePath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  const bgHex = image.getPixelColor(w - 50, Math.floor(h / 2));
  console.log(`Background pixel color (hex): ${bgHex.toString(16)}`);

  // 1. Find left edge of the room card (using middle row since window is bright)
  let left = 0;
  for (let x = 0; x < w; x++) {
    const color = image.getPixelColor(x, Math.floor(h / 2));
    if (colorDiff(color, bgHex) > 30) {
      left = x;
      break;
    }
  }

  // 2. Find bottom edge of the room card by scanning column x = left + 100 downwards
  let bottom = h - 10;
  for (let y = h - 10; y >= 120; y--) {
    const color = image.getPixelColor(left + 100, y);
    if (colorDiff(color, bgHex) > 30) {
      bottom = y;
      break;
    }
  }

  // 3. Scan horizontally at scanY = bottom - 30 (which is inside the white footer bar)
  // to find the exact right edge of the card.
  const scanY = bottom - 30;
  console.log(`Scanning horizontally for right edge at y = ${scanY} (white footer bar level)...`);
  
  let right = left;
  for (let x = left + 200; x < w; x++) {
    const color = image.getPixelColor(x, scanY);
    // If the color becomes dark (close to background), we have exited the white bar!
    if (colorDiff(color, bgHex) < 30) {
      right = x - 1;
      break;
    }
  }

  // 4. Find top edge of the card by scanning column midX downwards
  const midX = Math.floor((left + right) / 2);
  let top = 120;
  for (let y = 120; y < h; y++) {
    const color = image.getPixelColor(midX, y);
    if (colorDiff(color, bgHex) > 30) {
      top = y;
      break;
    }
  }

  console.log(`Discovered room card bounding box: left=${left}, top=${top}, right=${right}, bottom=${bottom}`);
  console.log(`Card dimensions: width=${right - left + 1}, height=${bottom - top + 1}`);

  // Crop room card
  const cropped = image.clone().crop({ x: left, y: top, w: right - left + 1, h: bottom - top + 1 });
  await cropped.write('E:\\sp\\umiya\\public\\images\\living_room_base.png');
  console.log('Saved cropped card image to E:\\sp\\umiya\\public\\images\\living_room_base.png');
}

run().catch(console.error);
