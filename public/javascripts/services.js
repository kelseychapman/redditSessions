app.service('postsService', function($http){
  return {
    getPosts: function(){
      return $http.get('/api/allposts').then(function(response){
        return response.data
      })
    },
    newPost: function(post){
      return $http.post('/api/newpost', post).then(function(response){
        return response.data
      })
    }
  }
})

app.service('authService', function($http){
  return {
    signup: function(userObj){
      return $http.post('/api/signup', userObj).then(function(response){
      })
    }
  }
})
