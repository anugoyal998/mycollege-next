const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {type: String, required: true},
},{
    timestamps: true,
})

module.exports = mongoose.models.User || mongoose.model('User',userSchema)