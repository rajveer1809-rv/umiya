const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('E:\\sp\\umiya\\public\\images\\living_room_base.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  // Let's sample the wall at a few coordinates (relative to the cropped image)
  // Wall is in the upper half, around x = 400, y = 200
  const samples = [
    { x: 300, y: 150 },
    { x: 500, y: 150 },
    { x: 300, y: 300 },
    { x: 500, y: 300 },
    { x: 800, y: 200 }, // right wall
    { x: 800, y: 350 }, // right wall lower
    { x: 250, y: 100 }, // top left wall
  ];

  for (const s of samples) {
    const hex = image.getPixelColor(s.x, s.y);
    const r = (hex >>> 24) & 0xff;
    const g = (hex >>> 16) & 0xff;
    const b = (hex >>> 8) & 0xff;
    console.log(`Sample at (${s.x}, ${s.y}): RGB(${r}, ${g}, ${b}) -> #${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`);
  }
}

run().catch(console.error);
