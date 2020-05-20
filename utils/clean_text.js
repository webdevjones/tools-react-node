const he = require('he')
const striptags = require('striptags')

const cleanText = (text, title) => {
    text = striptags(he.decode(text))
        .replace(/[\n\r\t]/ig, '')
        .split(' ')
        .splice(0, 35)
        .join(' ')
        .replace(/^\s+?/, '')

    return title ? text : text += '...'
}

module.exports = cleanText