const axios = require('axios')
const convert = require('xml-js')
const parseFeed = require('../utils/parse_feeds')
const config = require('../utils/config')
const get_template = require('../utils/get_template')


const limit = 25
const section_route_worker = async (feed, host, template, impact, podcast) => {
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

    const templates = {
        baseHTML: await get_template(template),
        impact: await get_template(`impact_box/${impact}`),
        internalAd: await get_template('Internal_ad.html'),
        adSpacer: await get_template('Ad_spacer.html'),
        featured: await get_template('Featured.html'),
        snapshotImg: await get_template('Snapshot_with_image.html'),
        snapshot: await get_template('Snapshot.html'),
        podcast: podcast ? await get_template(`podcast/${podcast}`) : await get_template('podcast/Null_Podcast.html')
    }
    ret.templates = templates
    return ret
}

module.exports = section_route_worker