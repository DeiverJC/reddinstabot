
require( 'dotenv' ).config();
require( './config/database' );
const { createPost, updatePost, findOne } = require('./src/services/PostService')

const data = {
    post_id:  '43534eferd',
    subreddit: 'battlestation',
    post_user: 'makrid',
    image_url: 'https://i.redd.it/osyq4avxgop61.jpg',
}
const data2 = { ig_post_url:  'https://instagram.com/p/v6666666' }
const data3 = { post_id:  '43534eferds' }

console.log( '✔ Bootstrapping Application' );
//const result = createPost(data)
//const result = updatePost('6060c0cbc24c2a4258fb2f29', data2)
//const result = findOne(data3)
result.then(r => console.log(r))