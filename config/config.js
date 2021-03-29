module.exports.getConfig = () => {
    const config = {
        'MONGO_URL': process.env.MONGO_URL,
        'IG_USER': process.env.IG_USER,
        'IG_PASSWORD': process.env.IG_PASSWORD,
        'REDDIT_URL': process.env.REDDIT_URL,
        'HASHTAGS': process.env.HASHTAGS
    }
    return config
}