const axios = require('axios')
const convert = require('xml-js')
const parseFeed = require('../utils/parse_feeds')
const config = require('../utils/config')
const get_template = require('../utils/get_template')


const limit = 25
const section_route_worker = async (feed, host, template) => {
    const xml = await axios.get(feed)
    const resdata = await axios.get('https://api.chartbeat.com/live/toppages/v3/', {
        params: {
            apikey: config.CBAPI_KEY,
            host: host,
            limit: limit
        }
    })
    const pages = resdata.data.pages
    const converted = convert.xml2js(xml.data, { compact: true, spaces: 4 })
    const elements = converted.rss.channel.item
    let ret
    if (host === 'newsbusters.org') {
        ret = parseFeed.NB(elements, pages)
    }
    else if (host === 'cnsnews.com') {
        ret = parseFeed.CNS(elements, pages)
    }
    else if (host === 'mrctv.org') {
        ret = parseFeed.MRCTV(elements, pages)

    }
    const data = await get_template(template)
    const templates = {
        baseHTML: data
    }
    ret.templates = templates
    console.log(ret)
    return ret
}

module.exports = section_route_worker