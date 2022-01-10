const mongoose = require('mongoose')

const TempOtpSch = new mongoose.Schema({
    email: 'string',
    hash: 'string',
    expireAt: {
        type: Date,
        default: Date.now(),
        index: {
            expires: '300s'
        }
    }
})

module.exports = mongoose.models.TempOtp || mongoose.model('TempOtp',TempOtpSch)