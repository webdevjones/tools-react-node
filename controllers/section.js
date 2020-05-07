const sectionRouter = require('express').Router()
const axios = require('axios')
const convert = require('xml-js')
const parseFeed = require('../utils/parse_feeds')
const config = require('../utils/config')
const get_template = require('../utils/get_template')
const section_route_worker = require('../utils/section_route_worker')


const limit = 25
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
    // const xml = await axios.get('')
    // const resdata = await axios.get('https://api.chartbeat.com/live/toppages/v3/', {
    //     params: {
    //         apikey: config.CBAPI_KEY,
    //         host: 'newsbusters.org',
    //         limit: limit
    //     }
    // })
    // const pages = resdata.data.pages
    // const feed = convert.xml2js(xml.data, { compact: true, spaces: 4 })
    // const elements = feed.rss.channel.item

    // res.json(parseFeed.NB(elements, pages))
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

/* const resdata = await axios.get('https://api.chartbeat.com/live/toppages/v3/', {
    params: {
        apikey: '68e8950cddb068b6560edf0d67152d77',
        host: 'newsbusters.org',
        limit: limit
    }
})
const pages = resdata.data.pages
console.log(pages[1]) */