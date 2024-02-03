import fs from 'fs';
import path from 'path';
import sharp from 'sharp';


export async function processImages(options) {
  const directory = process.cwd();
  let files = fs.readdirSync(directory);

  fs.mkdir(`${directory}/edited`, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Directory created successfully.');
  });

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
  const outputFilename = path.join(
    path.dirname(imagePath),
    path.basename(imagePath, path.extname(imagePath)) + `.${options.f}`
  );


  try {
    let pipeline = sharp(imagePath);

    if (options.r) {
      const dimensions = options.r.split('x').map(Number);
      pipeline = pipeline.resize(dimensions[0], dimensions[1]);
    }

    if (options.f) {
      pipeline = pipeline.toFormat(options.f, {
        quality: options.q || 100
      });
    } else if (options.q) {
      pipeline = pipeline.jpeg({ quality: options.q });
    }


    pipeline.toFile(outputFilename)
      .then(() => console.log('Image processing complete.'))
      .catch(err => console.error('Error processing image:', err));
  } catch (error) {
    console.log('Error initializing image processing:', error);
  }




}
