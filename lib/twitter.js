'use strict'
require('dotenv').config({ path: __dirname + '/.env' })

const fs = require('fs')
const { TwitterClient } = require('twitter-api-client')

const IMAGE_PATH = process.env.IMAGE_PATH

const T = new TwitterClient({
  apiKey: process.env.TWITTER_CONSUMER_KEY,
  apiSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_CONSUMER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_CONSUMER_ACCESS_TOKEN_SECRET,
  ttl: 60*1000
})

class Twitter {
  getImagePath (filename) {
    return `./${IMAGE_PATH}/${filename}`
  }

  readImage (filename) {
    return fs.readFileSync(this.getImagePath(filename), { encoding: 'base64' })
  }

  async updateProfileBanner (filename) {
    let banner = this.readImage(filename)
    const result = await T.accountsAndUsers.accountUpdateProfileBanner({ banner })
  }

  async updateAvatar (filename) {
    let image = this.readImage(filename)
    const result = await T.accountsAndUsers.accountUpdateProfileImage({ image })
  }
}

module.exports = new Twitter()
