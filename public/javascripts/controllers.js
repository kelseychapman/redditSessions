app.controller('main', function($scope){

  $scope.arr = [
    {
      title: 'A title',
      comments: [1,2,3],
      author: 'James',
      showCommentsBool: false,
      voteCount: 2
    },
    {
      title:'B Title ',
      comments: [1],
      author: 'Sasha',
      showCommentsBool: false,
      voteCount: 2
    }
  ]


  $scope.sortType = '-voteCount'
  $scope.sortDisplay = "Votes"

  $scope.increment = function(post){
    post.voteCount++
  }

  $scope.decrement = function(post){
    post.voteCount--
  }

  $scope.toggleComments = function(post){
    if (post.showCommentsBool){
      post.showCommentsBool = false
    } else {
      post.showCommentsBool = true
    }
  }



  $scope.sortBy = function(input){
    console.log('sortBy clicked');
    $scope.sortType = input;
    if (input == '-voteCount') {
      $scope.sortDisplay = 'Votes'
    } else {
      $scope.sortDisplay = 'Title'
    }
  }


})
