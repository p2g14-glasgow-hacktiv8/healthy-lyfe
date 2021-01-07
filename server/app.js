require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes')
const error = require('./middlewares/error')
const cors = require('cors')

app.use(express.urlencoded({ extended:true }))


app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use(router)

app.use(error)

app.listen(port, ()=> {
    console.log(`App ini berjalan di port ${port}`)
})
