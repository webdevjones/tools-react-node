const he = require('he')
const striptags = require('striptags')

const cleanText = (text) => {
    text = striptags(he.decode(text)).replace(/[\n\r\t]/ig, '')
    return text
}

module.exports = cleanText