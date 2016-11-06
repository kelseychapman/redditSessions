const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js')
const bcrypt = require('bcrypt')

/* GET home page. */
router.get('/allposts', function(req, res, next) {
  knex('posts').innerJoin('users', 'posts.user_id', 'users.id')
    .then(function(results) {
      res.json(results)
    })
});

router.get('/userinfo', function(req, res, next){
  console.log('whoo');
  if (!req.session.userInfo){
    console.log('Not authorized');
  } else {
    knex('users').where('id', req.session.userInfo.id)
    .then(function(results){
      res.send(results)
    })
  }
})

router.post('/newpost', function(req, res, next) {
  if (!req.session.userInfo ){
    console.log('Not authorized');
  } else {
    knex('posts')
    .returning('*')
    .insert({
      user_id: req.session.userInfo.id,
      title: req.body.title,
      body: req.body.description,
      img: req.body.image,
      voteCount: 1
    }).then(function(results) {
      res.send(results)
    })
  }
})

router.post('/signup', function(req, res, next) {
  knex('users').where('username', req.body.username).then(function(results) {
    if (results.length >= 1) {
      console.log('User already exists!');
    } else {
      let hash = bcrypt.hashSync(req.body.password, 12)
      knex('users')
      .returning('*')
      .insert({
        username: req.body.username,
        hashed_pw: hash
      }).then(function(results){
        let userSesh = results[0]
        delete userSesh.hashed_pw
        req.session.userInfo = userSesh
        res.send('User signed up!')
      })
    }
  })
})

router.post('/login', function(req, res, next){
  knex('users').where('username', req.body.username).then(function(results){
    if (results.length < 1){
      console.log('Not authorized');
    } else {
      let isValid = bcrypt.compareSync(req.body.password, results[0].hashed_pw)
      if (isValid){
        let userSesh = results[0]
        delete userSesh.hashed_pw
        req.session.userInfo = userSesh
        res.send('User logged in!')
      } else {
        console.log('wrong password');
      }
    }
  })
})

module.exports = router;
