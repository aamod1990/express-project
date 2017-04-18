angular.module('app.run',['app.homeServices'])
.run(function($rootScope, $location, $route, AuthService) {
	console.log("run");
	$rootScope.$on('$routeChangeStart',
		function (event, next, current) {
			AuthService.getUserStatus()
				.then(function successCallback(response) {              //call when status code between 200 to 299
                    if(next.access.restricted && !response.data.status){
                        $location.path('/login');
                        $route.reload();
                    }
				}, function errorCallback(response) {  //call when status code more then 299
                    if(next.access.restricted && !response.data.status){
                        $location.path('/login');
                        $route.reload();
                    }
				});
		});
    })