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

  .when('/dashboard', {
    templateUrl: '../partials/dashboard.html',
    controller: 'dashboard'
  })
})
