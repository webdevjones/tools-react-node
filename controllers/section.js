const sectionRouter = require('express').Router()

const section_route_worker = require('../utils/section_route_worker')


sectionRouter.get('/', async (req, res) => {
    res.send('<h1>Herro world</h1>')
})

sectionRouter.get('/nbdaily', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.newsbusters.org/cyberalert/feed',
        'newsbusters.org',
        'NB_Daily_Complete.html'
    ))
})

sectionRouter.get('/fsa', async (req, res) => {

    res.json(await section_route_worker(
        'https://www.newsbusters.org/division/fsa/feed',
        'newsbusters.org',
        'FSA_Complete.html'
    ))
})

sectionRouter.get('/culture', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.newsbusters.org/division/culture/feed',
        'newsbusters.org',
        'Culture_Complete.html'
    ))
})

sectionRouter.get('/latino', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.newsbusters.org/division/latino/feed',
        'newsbusters.org',
        'Latino_Complete.html'
    ))
})

sectionRouter.get('/cnsnews', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.cnsnews.com/newsletters/feeds/all',
        'cnsnews.com',
        'CNS_Complete.html'
    ))
})

sectionRouter.get('/mrctv', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.mrctv.org/newsletters/feeds/blog',
        'mrctv.org',
        'MRCTV_Complete.html'
    ))
})

module.exports = sectionRouter

