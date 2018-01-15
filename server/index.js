const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

// Sample data
const items = []
for (let i = 1; i < 1001; i++)
    items.push(`Item #${i}`)

const randomInt = (from, to) =>
    Math.floor((Math.random() * (to - (from + 1))) + from)

app.get('/', (req, res) => {
    
    // @todo Error handling for parseInt
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 10
    const offset = (page * limit)
    
    // Simulate latency
    setTimeout(() => {
        res.json({
            page,
            limit,
            total: items.length,
            items: items.slice(offset, (offset + limit))
        })
    }, randomInt(1000, 3000))
    
})

app.use(express.static(path.resolve(__dirname, '../client')))

app.listen(4000, () => console.log('ok go here http://localhost:4000/index.html'))
