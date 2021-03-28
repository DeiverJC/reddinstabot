const PostModel = require('../models/Post')

module.exports = {
    createPost: async (data) => {
        const post = new PostModel(data)
        try {
            const response = await post.save()
            return response
        } catch (error) {
            return error
        }
    },
    updatePost: async (id, data) => {
        try {
            const response = await PostModel.findByIdAndUpdate(id, data)
            return response
        } catch (error) {
            return error
        }
    },
    findOne: async (query) => {
        try {
            const response = await PostModel.findOne(query)
            return response
        } catch (error) {
            return error
        }
    }
}