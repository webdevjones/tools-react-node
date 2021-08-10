const sectionRouter = require('express').Router()

const section_route_worker = require('../utils/section_route_worker')


sectionRouter.get('/', async (req, res) => {
    res.send('<h1>Herro world</h1>')
})

sectionRouter.get('/nbdaily', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.newsbusters.org/feed/newsletter/nbdaily',
        'newsbusters.org',
        'NB_Daily_Complete.html',
        'NB_Daily_Impact.html',
        'NB_Podcast.html'
    ))
})

sectionRouter.get('/fsa', async (req, res) => {

    res.json(await section_route_worker(
        'https://www.newsbusters.org/feed/newsletter/fsa',
        'newsbusters.org',
        'FSA_Complete.html',
        'FSA_Impact.html'
    ))
})

sectionRouter.get('/culture', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.newsbusters.org/feed/newsletter/culture',
        'newsbusters.org',
        'Culture_Complete.html',
        'Culture_Impact.html'
    ))
})

sectionRouter.get('/latino', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.newsbusters.org/feed/newsletter/latino',
        'newsbusters.org',
        'Latino_Complete.html',
        'Latino_Impact.html'
    ))
})

sectionRouter.get('/cnsnews', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.cnsnews.com/newsletters/feeds/all',
        'cnsnews.com',
        'CNS_Complete.html',
        'CNS_Impact.html'
    ))
})

sectionRouter.get('/mrctv', async (req, res) => {
    res.json(await section_route_worker(
        'https://www.mrctv.org/newsletters/feeds/blog',
        'mrctv.org',
        'MRCTV_Complete.html',
        'MRCTV_Impact.html'
    ))
})

module.exports = sectionRouter

