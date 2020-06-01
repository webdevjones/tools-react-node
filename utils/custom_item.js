//http://localhost:3001/api/custom/https%3A%2F%2Fwww.newsbusters.org%2Fblogs%2Fculture%2Fjay-maxson%2F2020%2F05%2F08%2Fnfl-must-play-even-if-trump-owners-watch-bunkers-players-risk
const axios = require('axios')
const convert = require('xml-js')
const clean = require('./clean_text')

const NB = async url => {
    let urlMatch = url.match(/newsbusters\.org\/(.*)$/)
    let urlSearch = urlMatch[1]
    const xml = await axios.get('https://www.newsbusters.org/feed/newsletter/nbdaily/backup')
    const converted = convert.xml2js(xml.data, { compact: true, spaces: 4 })
    const elements = converted.rss.channel.item
    console.log(elements)
    console.log(urlSearch)
    let findItem = elements
        .filter(elem => elem.link._text.includes(urlSearch))
        .map(i => {
            const timeArr = i.pubDate._text.split(' ')
            const date = timeArr.slice(0, 3).join(' ')
            const time = timeArr.slice(-2).join(' ')

            const newItem = {
                title: i.title._text,
                author: i['dc:creator']._text,
                link: i.link._text,
                image: i.guid._text,
                content: clean(i.description._text),
                pubDate: date,
                pubTime: time
            }
            return newItem

        })
    return findItem.length ? findItem[0] : 0
}

module.exports = {
    NB
}