//http://localhost:3001/api/custom/https%3A%2F%2Fwww.newsbusters.org%2Fblogs%2Fculture%2Fjay-maxson%2F2020%2F05%2F08%2Fnfl-must-play-even-if-trump-owners-watch-bunkers-players-risk
const axios = require('axios')
const convert = require('xml-js')
const clean = require('./clean_text')

const NB = async url => {
    let urlMatch = url.match(/newsbusters\.org\/(.*)$/)
    let urlSearch = urlMatch[1]
    const xml = await axios.get('https://www.newsbusters.org/nbdailybackup/feed')
    const converted = convert.xml2js(xml.data, { compact: true, spaces: 4 })
    const elements = converted.rss.channel.item
    let findItem = elements
        .filter(elem => elem.link._text.includes(urlSearch))
        .map(i => {
            const itemDate = new Date(Date.parse(i.pubDate._text))
            const newItem = {
                title: i.title._text,
                author: i.author._text,
                link: i.link._text,
                image: i.image._text,
                content: clean(i.content._cdata),
                pubDate: `${itemDate.getDay()} ${itemDate.toLocaleString('default', { month: 'short' })} ${itemDate.getFullYear()}`,
                pubTime: Number(itemDate.getHours()) > 12
                    ? `${itemDate.getHours() % 12}:${('0' + itemDate.getMinutes()).slice(-2)} PM`
                    : `${itemDate.getHours()}:${('0' + itemDate.getMinutes()).slice(-2)} AM`
            }
            return newItem

        })
    return findItem.length ? findItem[0] : 0
}

module.exports = {
    NB
}