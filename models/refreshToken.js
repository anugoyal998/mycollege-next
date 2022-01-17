const mongoose = require('mongoose')

const RefreshTokenSch = new mongoose.Schema({
    refresh_token: 'string',
    expireAt: {
        type: Date,
        default: Date.now(),
        index: {
            expires: '86400s'
        }
    }
})

module.exports = mongoose.models.RefreshToken || mongoose.model('RefreshToken',RefreshTokenSch)