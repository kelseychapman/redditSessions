app.service('postsService', function($http){
  return {
    getPosts: function(){
      return $http.post('/api/allposts').then(function(response){
        return response.data
      })
    }
  }
})
