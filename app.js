const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('config')
const authRouter = require('./routers/auth')
const linksRouter = require('./routers/links')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use('/api/auth',  authRouter)
app.use('/api/link',  linksRouter)

const PORT = config.get('port') || '5000';

(async () => {
    try {
        await mongoose.connect(config.get('dbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Server was starded on port ${PORT}`))
    } catch (e) {
        console.error(e.message)
        process.exit(1)
    }
})()
