
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
  knex('users').del(),
  knex('users').insert({username:'freemanjamesh', hashed_pw: '$2a$06$j/VnOcRDbua45s6zjghbpubcF1wjU4mwmvtmuGAN28MfV3PtfZp2W'}),
  knex('users').insert({username:'adunbar', hashed_pw: '$2a$06$j/VnOcRDbua45s6zjghbpubcF1wjU4mwmvtmuGAN28MfV3PtfZp2W'}),
  knex('users').insert({username:'mayamoo', hashed_pw: '$2a$06$j/VnOcRDbua45s6zjghbpubcF1wjU4mwmvtmuGAN28MfV3PtfZp2W'}),
  knex('posts').del(),
  knex('posts').insert({title:'post1', user_id:1, body: 'This is the first post.', img: 'http://loremflickr.com/128/128/', voteCount: 5 }),
  knex('posts').insert({title:'post2', user_id:2, body: 'This is the second post.', img: 'http://loremflickr.com/127/127/', voteCount: 9 }),
  knex('posts').insert({title:'post3', user_id:3, body: 'This is the third post.', img: 'http://loremflickr.com/129/129/', voteCount: 3 })
  ])
};
