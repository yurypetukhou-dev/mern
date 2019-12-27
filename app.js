const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json({ extended: true }))

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
