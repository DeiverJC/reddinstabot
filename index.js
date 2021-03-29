
require( 'dotenv' ).config();
require( './config/database' );
const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
const schedule = require('node-schedule')
const { createPost, updatePost } = require('./src/services/PostService')
const { getRedditPost } = require('./src/services/RedditService')

const { IG_USER: username, IG_PASSWORD: password, HASHTAGS: hashtags  } = require('./config/config').getConfig()

const cookieStore = new FileCookieStore('./cookies.json')
const client = new Instagram({ username, password, cookieStore })

// Run every 24 hours at 09:30
schedule.scheduleJob('30 9/24 * * *', () => {
    console.log( '✔ Bootstrapping Application' );
    getRedditPost().then(redditData => {
        const data = {
            post_id:  redditData.id,
            subreddit: redditData.subreddit_name_prefixed,
            post_user: redditData.author,
            image_url: redditData.url,
        }
        createPost(data).then(newPost => {
            ;(async () => {
                console.log('∙∙∙ Uploading posts')
                const photo = newPost.image_url
                const caption = ` 
                    Via reddit.com/${newPost.subreddit}
                    By reddit.com/u/${newPost.post_user}
                `
                const comment = hashtags
                
                await client.login()
                const { media } = await client.uploadPhoto({ photo: photo, caption: caption, post: 'feed' })
                await client.addComment({ mediaId: media.id, text: comment })
                const ig_post_url = `https://www.instagram.com/p/${media.code}/`
                updatePost(newPost._id, { ig_post_url }).then(r => console.log('✔ Post uploaded at ', new Date()))
            })()
        })
    })
})