angular.module('app.loginController',['app.homeServices'])
.controller('loginController', function($scope,$rootScope,$location,AuthService) {
   $scope.login = function(){
       // initial values
       $scope.error = false;
       $scope.disabled = true;
       AuthService.login($scope.loginForm)
       .then(function successCallback(response){
           if(response.status === 200 && response.data.status === true){
               $scope.disabled = false;
               $scope.loginForm = {};
               $location.path('/');
           }
           else if(response.status === 200 && response.data.status === false){
               $scope.error = true;
               $scope.disabled = false;
               $scope.errorMessage = response.data.message;
           }else{
               $scope.error = true;
               $scope.errorMessage = "Something went wrong!";
               $scope.disabled = false;
               $scope.loginForm = {};
           }
       },function errorCallback(error){
           $scope.error = true;
           $scope.errorMessage = "Something went wrong!";
           $scope.disabled = false;
           $scope.loginForm = {};
       })

   }
});