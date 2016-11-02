app.config(function($routeProvider){
  $routeProvider

  .when('/', {
    templateUrl: '../partials/frontpage.html',
    controller: 'main'
  })
})
