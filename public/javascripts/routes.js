app.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: '../partials/frontpage.html',
    controller: 'main'
  })

  .when('/loginsignup', {
    templateUrl: '../partials/loginsignup.html',
    controller: 'auth'
  })
})
