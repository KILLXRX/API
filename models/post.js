const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    username: {type: String, required: true},
    adminType: {type: String, required: true},
    userID: Number,
    adminLevel: {type: Number, required: true},
    date: {type: Date, default: Date.now}
})


module.exports = mongoose.model('admins', PostSchema);