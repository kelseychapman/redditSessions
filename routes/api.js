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

router.post('/newpost', function(req, res, next) {
  if (!req.session.userInfo) {
    console.log('failed!');
    res.send(false)
  } else {
    knex('posts')
    .returning('*')
    .insert({
      user_id: req.body.authorID,
      title: req.body.title,
      body: req.body.description,
      img: req.body.image,
      voteCount: 1
    }).then(function(results) {
      res.send(results)
    })
  }
})

router.post('/newuser', function(req, res, next) {
  knex('users').where('username', req.body.username).then(function(results) {
    if (results.length >= 1) {
      var err = new Error()
      err.status = 409
      err.message = 'User already exists.'
      next(err)
    } else {
      var hash = bcrypt.hashSync(req.body.password, 12)
      knex('users')
        .returning('*')
        .insert({
          username: req.body.username,
          hashed_pw: hash
        })
        .then(function(results) {
          let userSesh = results;
          delete userSesh[0].password
          req.session.userInfo = userSesh
          res.status(200).send('hello')
        })
    }
  })
})

router.post('/login', function(req, res, next) {
  knex('users').where('username', req.body.username).then(function(results) {
    console.log('req:', req)
    if (results.length == 0) {
      console.log('user not found');
      res.send(false)
    } else {
      var user = results[0];
      var passwordMatch = bcrypt.compareSync(req.body.password, user.hashed_pw)
      delete user.password;
      if (passwordMatch === false) {
        console.log('password doesnt match');
        res.send(false)
      } else {
        console.log('setting userinfo (login): ', user);
        req.session.userInfo = user
        res.status(200).send(req.session.userInfo)
      }
    }
  })
})

module.exports = router;
