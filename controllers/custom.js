const customRouter = require('express').Router()
const customItem = require('../utils/custom_item')
//const config = require('../utils/config')

customRouter.get('/', async (req, res) => {
    res.send('<h1>Herro world</h1>')
})
customRouter.get('/:url', async (req, res) => {
    const url = req.params.url
    if (url.includes('newsbusters.org')) {
        customItem.NB(url)
        res.send('<h3>nb</h3>')
    }
    else {
        res.status(404).end()
    }
})

module.exports = customRouter
