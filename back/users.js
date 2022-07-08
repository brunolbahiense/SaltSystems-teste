const mongoose = require('mongoose')
const { Schema } = mongoose

const user = new Schema({
    id: Schema.ObjectId,
    name: String,
    email: String,
    stack: Array,
    gender: String,
    info: String,
    age: Number

})

module.exports = mongoose.model('user', user)