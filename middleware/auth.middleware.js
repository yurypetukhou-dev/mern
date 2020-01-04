const jwt = require('jsonwebtoken')
const config = require('config')

const isAuth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({msg: 'User not registred'})
        }

        const decoder = jwt.verify(token, config.get('jwtSecret'))
        console.log(decoder)
        req.user = decoder
        next()
    } catch (e) {
        res.status(401).json({msg: 'User not registred'})
    }
}

module.exports = isAuth