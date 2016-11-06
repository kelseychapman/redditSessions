app.controller('main', function($scope, $rootScope, $cookies, postsService, cookieService) {
  $scope.newPostObj = {}
  $scope.searchBar = true;
  $scope.sortDisplay = "Title"
  $scope.cookies = $cookies.getAll()

  $scope.$watch('cookies', function() {
    if ($cookies.getAll().redditSession) {
      $scope.$emit('cookiesDetected')
      $scope.userWelcome = cookieService.decodeCookie($cookies.get('redditSession'))
    }
  })

  $scope.$on('cookiesDetected', function() {
    $scope.userWelcome = cookieService.decodeCookie($cookies.get('redditSession'))
  })

  $scope.showSearch = function() {
    $scope.searchBar = true
  }

  $scope.hideSearch = function() {
    $scope.searchBar = false
  }

  postsService.getPosts().then(function(results) {
    $scope.arr = results
  })

  $scope.logout = function() {
    $cookies.remove('redditSession')
    $cookies.remove('redditSession.sig')
    $scope.userWelcome = null
  }

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
    if (!$scope.postFormBool) {
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


app.controller('auth', function($scope, $cookies, authService) {

  $scope.userObj = {}

  $scope.signup = function(obj) {
    authService.signup(obj).then(function(response) {})
  }

  $scope.login = function(obj) {
    authService.login(obj).then(function(response) {})
  }

})

app.controller('dashboard', function($scope, userService) {
  userService.getUser().then(function(results) {
    $scope.user = results[0]
  })
})
