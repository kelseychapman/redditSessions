var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js')

/* GET home page. */
router.post('/allposts', function(req, res, next) {
  // knex('posts').then(function(results){
  //   res.json(results)
  knex('posts').innerJoin('users', 'posts.user_id', 'users.id')
    .then(function(results) {
      res.json(results)
    })
});

module.exports = router;
