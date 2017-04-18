var app = angular.module('app',['ngRoute','app.loginController','app.forgotPasswordController','app.resendActivationMailController','app.homeController','app.config','app.run','app.registrationController','app.directives']);
app.config(function($routeProvider) {
	console.log("config app");
	$routeProvider
	.when('/',{
        templateUrl : 'partials/home.html',
        controller  : 'homeController',
        access: {restricted: true}

	})
	.when('/login',{
		templateUrl : 'partials/login.html',
		controller  : 'loginController',
        access      : {restricted: false}
	})
	.when('/registration',{
		templateUrl : 'partials/registration.html',
		controller  : 'registrationController',
        access      : {restricted: false}
	})
    .when('/forgotpassword',{
        templateUrl : 'partials/forgotpassword.html',
        controller  : 'forgotPasswordController',
        access      : {restricted: false}
    })
    .when('/resendactivationmail',{
        templateUrl : 'partials/resend-activation-mail.html',
        controller  : 'resendActivationMailController',
        access      : {restricted: false}
    })
    .when('/logout', {
        controller: 'homeController',
        access: {restricted: true}
    })
	.otherwise({
      redirectTo: '/'
    });
});