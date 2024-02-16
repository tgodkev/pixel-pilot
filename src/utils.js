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

  });

  let images = files.filter(file => {
    return ['.png', '.jpg', '.webp', 'jpeg'].includes(path.extname(file).toLowerCase());
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

  const subDir = "edited";

  const outputDir = path.join(path.dirname(imagePath), subDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }


  const outputFilename = path.join(
    outputDir,
    path.basename(imagePath, path.extname(imagePath)) + `.${options.f}`
  );



  try {
    let pipeline = sharp(imagePath);

    if (options.r) {
      const dimensions = options.r.split('x').map(Number);
      pipeline = pipeline.resize(...dimensions);
    }

    if (options.f) {
      pipeline = pipeline.toFormat(options.f, {
        quality: options.q || 100
      });
    } else if (options.q) {
      // Default format to JPEG if format isn't specified but quality is
      pipeline = pipeline.jpeg({ quality: options.q });
    }

    await pipeline.toFile(outputFilename);
    console.log('Image processing complete.');
  } catch (error) {
    console.error('Error processing image:', error);
  }
}
