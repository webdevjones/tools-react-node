const customRouter = require('express').Router()
const customItem = require('../utils/custom_item')
//const config = require('../utils/config')

customRouter.get('/', async (req, res) => {
    res.send('<h1>Herro world</h1>')
})
customRouter.get('/:url', async (req, res) => {
    const url = req.params.url
    if (url.includes('newsbusters.org')) {
        const item = await customItem.NB(url)
        item ? res.json(item) : res.status(400).end()
    }
    else if (url.includes('cnsnews.com')) {
        const item = await customItem.CNS(url)
        item ? res.json(item) : res.status(400).end()
    }
    else if (url.includes('mrctv.org')) {
        const item = await customItem.MRCTV(url)
        item ? res.json(item) : res.status(400).end()
    }
    else {
        res.status(400).end()
    }
})

module.exports = customRouter
