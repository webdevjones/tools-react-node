const clean = require('./clean_text')

const NB = (xml, cbdata) => {
    let topItems = []
    let items = xml
        .map(i => {
            const itemDate = new Date(Date.parse(i.pubDate._text))
            const newItem = {
                title: i.title._text,
                author: i.author._text,
                link: i.link._text,
                image: i.image._text,
                content: clean(i.content._cdata),
                pubDate: itemDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                pubTime: itemDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
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
            const newItem = {
                title: i.title._text,
                author: i['dc:creator']._text,
                link: i.link._text,
                image: i.guid._text,
                content: clean(i.description._text),
                pubDate: itemDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                pubTime: itemDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
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
            const newItem = {
                title: clean(i.title._cdata),
                author: i.author._text,
                link: i.link._text,
                image: i.image._text,
                content: clean(i.content._cdata),
                pubDate: itemDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                pubTime: itemDate.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
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