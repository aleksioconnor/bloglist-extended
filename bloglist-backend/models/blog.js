const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
    likes: {type: Number, default: 0},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
})

module.exports = mongoose.model('Blog', blogSchema)