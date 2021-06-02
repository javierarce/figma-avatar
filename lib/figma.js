'use strict'
require('dotenv').config()

const fs = require('fs')
const Extractor = require('figma-extractor')

const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FIGMA_FILE = process.env.FIGMA_FILE
const IMAGE_PATH = process.env.IMAGE_PATH
const DEFAULT_ENCODING = 'utf8'

const OPTIONS = {
  format: 'jpg',
  dont_overwrite: false
}

class Figma {
  download (body) {
    return new Promise(async(resolve, reject) => {
      if (body && body.retries) {
        return
      }

      let extractor = new Extractor(FIGMA_TOKEN, body.file_key || FIGMA_FILE, OPTIONS)

      extractor.extract(IMAGE_PATH).then((files) => {
        resolve(files)
      }).catch((error) => {
        console.error('Noooo!', error)
        reject({ error })
      })
    })
  }

}

module.exports = new Figma()
