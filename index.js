const express = require('express')
const app = express()
require('express-async-errors')
const sectionRouter = require('./controllers/section')
const customRouter = require('./controllers/custom')
const cors = require('cors')

const morgan = require('morgan')
app.use(express.static('build'))

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : ''
    ].join(' ')
}))
app.use(cors())



const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use('/api/section', sectionRouter)
app.use('/api/custom', customRouter)


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error('Error-', error.message)

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})