const fs = require('fs')
var path = require('path')


const get_template = template => {
    const filePath = path.join(__dirname, '..', 'NL_Templates', template)
    return fs.promises.readFile(filePath, 'utf-8')
}

module.exports = get_template