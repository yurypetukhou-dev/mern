const {Router} = require('express')
const router = Router()
const User = require("../model/user")
const {check, validationResult} = require('express-validator')

// api/registr
router.post('/registration', [
        check('email', 'Not correct Email')
            .isEmail()
            .isLength({min: 2}),
        check('password', 'Not correct password')
            .isLength({min: 2, max: 10})
    ],
    async (req, res) => {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status('400').json(err)
        }
        const email = req.body.email
        const password = req.body.password

        User.findOne({email: email}, (err, user) => {
            if (user) {
                return res.status('400').json({errors: [{msg: 'This user has been registration'}] })
            } else {
                try {
                    let newUser = new User({
                        email: email,
                        passwordHash: ''
                    })
                    newUser.password = newUser.setPassword(password)
                    newUser
                        .save((err) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.json({msg: 'user was added', status: 'ok'})
                                }

                            }
                        )
                } catch (e) {
                    console.log(e.message)
                }
            }
        })

    })

router.post('/login',  [
    check('email', 'Not correct Email')
        .isEmail()
        .isLength({min: 2}),
    check('password', 'Not correct password')
        .isLength({min: 2, max: 10})
], (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        return res.status('400').json(err)
    }

    const {email, password} = req.body

    User.findOne({email: email},  (err, user) => {
       if (!user) {
           return res.status('400').json({errors: [{msg: 'This user not found'}] })
       }

       if(user.validPassword(password)) {
           const jwt = user.generateJWT()
           res.json({userId: user.id, jwtToken: jwt})
       }
    })
})
module.exports = router
