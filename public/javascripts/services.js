app.service('postsService', function($http) {
  return {
    getPosts: function() {
      return $http.get('/api/allposts').then(function(response) {
        return response.data
      })
    },
    newPost: function(post) {
      return $http.post('/api/newpost', post).then(function(response) {
        return response.data
      })
    }
  }
})

app.service('authService', function($http, $location) {
  return {
    signup: function(newUser) {
      return $http.post('/api/newuser', newUser, {
          withCredentials: true
        })
        .then(function(response) {
          $location.path('/');
        }, function(error) {
          return error
        })
    },
    login: function(userCredentials) {
      console.log('login service called: ', userCredentials, {
        withCredentials: true
      });
      return $http.post('/api/login', userCredentials).then(function(response) {
        return response.data
      })
    }
  }
})
