const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    post_id:  String,
    subreddit: String,
    post_user: String,
    image_url: String,
    ig_post_url: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('Post', postSchema)