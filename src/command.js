import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { processImages } from './utils.js'

yargs(hideBin(process.argv))
  .command('batch', ' To Resize, Compress or Convert All Images In The Directory', (yargs) => {

    return yargs.positional('input', {
      describe: 'Use resize format of hxw',
      type: 'string'
    })

  })
  .option('resize', {
    alias: 'r',
    describe: 'resize the image',
    type: 'string',

  })
  .option('quality', {
    alias: 'q',
    describe: 'resize the image',
    type: 'number'
  })
  .option('format', {
    alias: 'f',
    describe: 'convert the image to a different format',
    type: 'string'
  })
  .check((argv) => {
    if (argv.r || argv.q || argv.f) {
      if (argv.resize.trim().toLowerCase().includes('x') !== true) {
        throw new Error('resize format must be in the format of hxw')
      }
      processImages(argv)
    }
    return true
  })
  .demandCommand(1)
  .parse()


