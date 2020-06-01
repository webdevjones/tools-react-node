const clean = require('./clean_text')

const NB = (xml, cbdata) => {
    let topItems = []
    let items = xml
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
    cbdata.forEach(elem => {
        items.forEach(item => {
            if (elem.path !== '/' && elem.path !== '/culture' && item.link.includes(elem.path)) {
                topItems.push(item)
                item.remove = 1
            }
        })
    })
    items = items.filter(i => i.remove !== 1)
    topItems = topItems.map(item => {
        delete item.remove
        return item
    })
    return {
        topItems: topItems,
        bottomItems: items
    }
}

const CNS = (xml, cbdata) => {

    let topItems = []
    let items = xml
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
    cbdata.forEach(elem => {
        items.forEach(item => {
            if (elem.path !== 'cnsnews.com/' && item.link.includes(elem.path)) {
                topItems.push(item)
                item.remove = 1
            }
        })
    })
    const _items = items.filter(i => i.remove !== 1)
    const _topItems = topItems.map(item => {
        delete item.remove
        return item
    })
    return {
        topItems: _topItems,
        bottomItems: _items
    }
}

const MRCTV = (xml, cbdata) => {
    let topItems = []
    let items = xml
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
    cbdata.forEach(elem => {
        items.forEach(item => {
            if (elem.path !== 'mrctv.org/' && item.link.includes(elem.path)) {
                topItems.push(item)
                item.remove = 1
            }
        })
    })
    const _items = items.filter(i => i.remove !== 1)
    const _topItems = topItems.map(item => {
        delete item.remove
        return item
    })
    return {
        topItems: _topItems,
        bottomItems: _items
    }
}

module.exports = {
    NB,
    CNS,
    MRCTV
}