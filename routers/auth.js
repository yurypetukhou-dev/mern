const {Router} = require('express')
const router = Router()
const User = require("../model/user")

// api/registr
router.post('/registr', async (req, res) => {
    const {email, passwordHash} = req.body

    try {
        let newUser = new User({
            email: email,
            passwordHash: ''
        })
        newUser.password = newUser.setPassword(passwordHash)

        console.log(newUser)
        newUser
            .save((err) => {

                if(err) {
                    console.log(err)
                } else {
                    res.json({msg: 'user was added'})
                }

                }
            )
    } catch (e) {
        console.log(e.message)
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
    } catch (e) {
        console.log(e.message)
    }
})

module.exports = router
