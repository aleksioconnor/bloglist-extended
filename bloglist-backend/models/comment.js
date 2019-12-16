const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content: {type: String, required: true},
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
})

module.exports = mongoose.model('Comment', commentSchema)