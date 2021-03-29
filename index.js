
require( 'dotenv' ).config();
require( './config/database' );
const { createPost, updatePost } = require('./src/services/PostService')
const { getRedditPost } = require('./src/services/RedditService')

/*const data2 = { ig_post_url:  'https://instagram.com/p/v6666666' }
//const result = updatePost('6060c0cbc24c2a4258fb2f29', data2)*/

console.log( '✔ Bootstrapping Application' );
getRedditPost().then(redditData => {
    const data = {
        post_id:  redditData.id,
        subreddit: redditData.subreddit_name_prefixed,
        post_user: redditData.author,
        image_url: redditData.url,
    }
    createPost(data).then(newPost => {
        console.log(newPost.image_url)
    })
})