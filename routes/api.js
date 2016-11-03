const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/allposts', function(req, res, next) {
  // knex('posts').then(function(results){
  //   res.json(results)
  knex('posts').innerJoin('users', 'posts.user_id', 'users.id')
    .then(function(results) {
      res.json(results)
    })
});

router.post('/newpost', function(req,res, next){
  knex('posts')
  .returning('*')
  .insert({
    user_id: req.body.authorID,
    title: req.body.title,
    body: req.body.description,
    img: req.body.image,
    voteCount: 1
  }).then(function(results){
    res.send(results)
  })
})

module.exports = router;
