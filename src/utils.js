import fs from 'fs';
import path from 'path';
import sharp from 'sharp';


export async function processImages(options) {
  const directory = process.cwd();
  let files = fs.readdirSync(directory);


  let images = files.filter(file => {
    return ['.png', '.jpg', '.webp'].includes(path.extname(file).toLowerCase());
  });

  if (images.length === 0) {
    console.log("No images found");
    return;
  }

  for (let image of images) {

    await processImage(path.join(directory, image), options);
  }
}

async function processImage(imagePath, options) {
  console.log("Processing image:", imagePath);

  const outputFilename = path.join(
    path.dirname(imagePath),
    path.basename(imagePath, path.extname(imagePath)) + '.png'
  );

  if (options.f) {
    await sharp(imagePath)
      .toFormat('png')
      .toFile(outputFilename);
    console.log("Output file:", outputFilename);
  }
}
