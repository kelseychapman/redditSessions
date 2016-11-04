app.controller('main', function($scope, postsService, $cookies) {
  $scope.newPostObj = {}
  $scope.postFormBool = false;
  $scope.sortType = '-voteCount'
  $scope.sortDisplay = "Votes"
  $scope.isLoggedInBool = false

  if ($cookies.get('redditSession')){
    let decodedCookie = atob($cookies.get('redditSession'))
    let sliceStart = (decodedCookie.indexOf('username":"') + 11)
    let sliceEnd = (decodedCookie.indexOf('","hashed_pw"'))
    let username = decodedCookie.slice(sliceStart, sliceEnd)
    $scope.username = username
  }

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

app.controller('auth', function($scope, authService, $cookieStore) {

  $scope.userObj = {}
  $scope.userExistsBool = false
  $scope.genericErrorBool = false

  $scope.signup = function(obj) {
    authService.signup(obj).then(function(response) {
      if (response.status) {
        if (response.status === 409) {
          $scope.userExistsBool = true
        } else {
          $scope.genericErrorBool = true
        }
      } else {

      }
    })
  }

  $scope.login = function(obj) {
    authService.login(obj)
  }

})
