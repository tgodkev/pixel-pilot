
# Pixel Pilot

Pixel Pilot is an open-source CLI tool designed for efficient batch image manipulation. Leveraging the power of [Sharp](https://sharp.pixelplumbing.com/), Pixel Pilot simplifies common image processing tasks such as resizing, format conversion, and quality adjustment, making it an indispensable tool for developers, photographers, and content creators.

## Features

- **Batch Processing**: Easily process multiple images in a single command.
- **Resize**: Change the dimensions of your images to fit your requirements.
- **Format Conversion**: Convert images to popular formats such as PNG, JPEG, and WebP.
- **Quality Adjustment**: Optimize your images by setting the desired quality level.

## Installation
  Pixel Pilot is available as an npm package. You can install it globally on your system using npm with the following command:
  npm install -g pixel-pilot


 
## Usage

To use Pixel Pilot, navigate to the directory containing your images and run:

pixel-pilot batch [options]
Available Commands
Currently, Pixel Pilot supports the following command:

batch: Processes all images in the current directory.
Options
All options are optional, but at least one must be specified:

--r "<width>x<height>": Resize images to the specified dimensions (in pixels).

--f "<format>": Convert images to the specified format (png, jpg, or webp).

--q <quality>: Set the quality of the output images (1-100).

Example
To resize all images in the current directory to 400x400 pixels, convert them to WebP format, and set the quality to 85:


pixel-pilot batch --r "400x400" --q 85 --f "webp"


## Warning
This tool will create a copy of every image in the directory used. Ensure you have sufficient storage space and are operating on a copy of your original images to prevent accidental data loss.

## Contributing
Contributions to Pixel Pilot are welcome! Whether it's reporting a bug, discussing improvements, or contributing code, we value your input.



##License
Pixel Pilot is released under the MIT License. Feel free to use, modify, and distribute it as per the license terms.
