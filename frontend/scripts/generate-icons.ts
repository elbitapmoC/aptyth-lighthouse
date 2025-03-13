import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // Create icons directory if it doesn't exist
  await mkdir("public/icons", { recursive: true });

  // Generate different sizes directly from SVG
  for (const size of sizes) {
    await sharp("public/lighthouse-logo.svg")
      .resize(size, size)
      .png()
      .toFile(`public/icons/icon-${size}x${size}.png`);

    console.log(`Generated ${size}x${size} icon`);
  }

  console.log("All icons generated successfully!");
}

generateIcons().catch(console.error);
