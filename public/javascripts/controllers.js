app.controller('main', function($scope, postsService) {

  $scope.newPostObj = {}
  $scope.postFormBool = false;
  $scope.sortType = '-voteCount'
  $scope.sortDisplay = "Votes"

  postsService.getPosts().then(function(results) {
    $scope.arr = results
  })

  $scope.newPost = function(obj) {
    postsService.newPost(obj).then(function(results) {
      $scope.newPostObj = {}
      $scope.postFormBool = false
      $scope.postForm.$setPristine()
    })
  }

  $scope.increment = function(post) {
    post.voteCount++
  }

  $scope.decrement = function(post) {
    post.voteCount--
  }

  $scope.changeBool = function() {
    if ($scope.postFormBool == false) {
      $scope.postFormBool = true;
    } else {
      $scope.postFormBool = false;
    }
  }

  $scope.sortBy = function(input) {
    $scope.sortType = input;
    if (input == '-voteCount') {
      $scope.sortDisplay = 'Votes'
    } else {
      $scope.sortDisplay = 'Title'
    }
  }

})
