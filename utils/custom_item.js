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

const CNS = async url => {
    let urlMatch = url.match(/cnsnews\.com\/(.*)$/)
    let urlSearch = urlMatch[1]
    const xml = await axios.get('https://www.cnsnews.com/newsletters/feeds/all')
    const converted = convert.xml2js(xml.data, { compact: true, spaces: 4 })
    const elements = converted.rss.channel.item
    console.log(elements)
    console.log(urlSearch)
    let findItem = elements
        .filter(elem => elem.link._text.includes(urlSearch))
        .map(i => {
            const itemDate = new Date(Date.parse(i.pubDate._text.slice(0, -2)))
            const time = i.pubDate._text
                .split(' ')
                .slice(-1)[0]
                .split(':')
                .slice(0, 2)
                .join(':') + ' ' + i.pubDate._text.slice(-2)


            const newItem = {

                title: i.title._text,
                author: i['dc:creator']._text,
                link: i.link._text,
                image: i.guid._text,
                content: clean(i.description._text),
                pubDate: itemDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                pubTime: time
            }
            return newItem

        })
    return findItem.length ? findItem[0] : 0
}

const MRCTV = async url => {
    let urlMatch = url.match(/mrctv\.org\/(.*)$/)
    let urlSearch = urlMatch[1]
    const xml = await axios.get('https://www.mrctv.org/newsletters/feeds/blog')
    const converted = convert.xml2js(xml.data, { compact: true, spaces: 4 })
    const elements = converted.rss.channel.item
    console.log(elements)
    console.log(urlSearch)
    let findItem = elements
        .filter(elem => elem.link._text.includes(urlSearch))
        .map(i => {
            const itemDate = new Date(Date.parse(i.pubDate._text))
            const timeArr = i.pubDate._text
                .split(' ')
                .slice(-2, -1)[0]
                .split(':')
                .map(p => Number(p))
            let am = timeArr[0] >= 12 ? 'PM' : 'AM'
            timeArr[0] = timeArr[0] > 12 ? timeArr[0] - 12 : timeArr[0]
            timeArr[0] = timeArr[0] === 0 ? 12 : timeArr[0]
            timeArr[1] = ('0' + timeArr[1]).slice(-2)
            const time = timeArr[0] + ':' + timeArr[1] + ' ' + am
            const newItem = {
                title: clean(i.title._cdata, true),
                author: i.author._text,
                link: i.link._text,
                image: i.image._text,
                content: clean(i.content._cdata),
                pubDate: itemDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                pubTime: time
            }
            return newItem

        })
    return findItem.length ? findItem[0] : 0
}

module.exports = {
    NB,
    CNS,
    MRCTV
}