const he = require('he')
const striptags = require('striptags')

const cleanText = (text) => {
    text = striptags(he.decode(text))
        .replace(/[\n\r\t]/ig, '')
        .split(' ')
        .splice(0, 35)
        .join(' ')
        .replace(/^\s+?/, '')

    return text += '...'
}

module.exports = cleanText