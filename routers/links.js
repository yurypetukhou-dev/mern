const {Router} = require('express')
const router = Router()
const Link = require('../model/link')
const isAuth = require('../middleware/auth.middleware')
const short = require('shortid')
const config = require('config')

router.post('/generate', isAuth, async (req, res) => {
    const baseUrl = config.get('baseUrl')
    const {from} = req.body

    const code = short.generate()

    const to = `${baseUrl}/t/${code}`
    let exacting = await Link.findOne({from: from})

    if (exacting) {
        return exacting
    }
    const link = new Link({
        code, to, from, owner: req.user.id
    })

    const data = await link.save()

    return res.json(data)
})

router.get('/', isAuth, async (req, res) => {

    try {
        const data = await Link.find({owner: req.user.id})
        return res.json(data)
    } catch (e) {}
})

router.get('/:id', isAuth,async (req, res) => {
    const {id} = req.params
    const link = await Link.findOne({_id: id})

    if(!link) {
        return res.status(404).json('Link didnr found')
    }

    return res.json(link)
})

module.exports = router