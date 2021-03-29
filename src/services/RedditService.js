const axios = require('axios')
config = require('../../config/config').getConfig()

const redditUrl = config.REDDIT_URL

module.exports = {
    getRedditPost: async () => {
        try {
            const response = await axios.get(redditUrl)
            const children = response.data.data.children
            const childrenFiltered = children.filter(child => child.data.is_video === false && child.data.url !== '')
            const data = childrenFiltered.shift().data
            return data
        } catch (error) {
            console.error(error)
        }
    }
}
