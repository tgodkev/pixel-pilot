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
  console.log("Options:", options);

  const outputFilename = path.join(
    path.dirname(imagePath),
    path.basename(imagePath, path.extname(imagePath)) + `.${options.f}`
  );

  // TODO rework if checks, would like to dynamically add options
  if (options.f && options.r && options.q) {
    let splitDimensions = options.r.split('x');
    let dimensions = splitDimensions.map(Number)
    console.log("Dimensions:", dimensions);
    sharp(imagePath)
      .resize(dimensions[0], dimensions[1])
      .toFormat(options.f, {
        quality: options.q
      })
      .toFile(outputFilename)
      .then(() => console.log('Image processing complete.'))
      .catch(err => console.error('Error processing image:', err));

    console.log("Output file:", outputFilename);
  }
}
