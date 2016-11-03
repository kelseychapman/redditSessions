app.controller('main', function($scope, postsService) {

  postsService.getPosts().then(function(results) {
    console.log('logging in controller: ', results);
    $scope.arr = results
  })

  $scope.sortType = '-voteCount'
  $scope.sortDisplay = "Votes"

  $scope.increment = function(post) {
    post.voteCount++
  }

  $scope.decrement = function(post) {
    post.voteCount--
  }

  $scope.postFormBool = false;

  $scope.changeBool = function() {
    console.log('current pfb: ', $scope.postFormBool);
    if ($scope.postFormBool == false) {
      console.log('Changing to true');
      $scope.postFormBool = true;
    } else {
      console.log('changing to false');
      $scope.postFormBool = false;
    }
  }

  $scope.toggleComments = function(post) {
    if (post.showCommentsBool) {
      post.showCommentsBool = false
    } else {
      post.showCommentsBool = true
    }
  }



  $scope.sortBy = function(input) {
    console.log('sortBy clicked');
    $scope.sortType = input;
    if (input == '-voteCount') {
      $scope.sortDisplay = 'Votes'
    } else {
      $scope.sortDisplay = 'Title'
    }
  }


})
