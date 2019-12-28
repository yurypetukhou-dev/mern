const {Schema, model, Types} = require('mongoose')
const crypto = require('crypto')
const config = require('config')

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },

    salt: String,
    links: [{ type: Types.ObjectId, ref: 'Link' }]
})

User.methods.setPassword = function (password) {
    console.log(password, '<--- model')
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

User.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.passwordHash === hash;
};

User.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    },config.get("jwtSecret") );
};

module.exports = model('User', User)
