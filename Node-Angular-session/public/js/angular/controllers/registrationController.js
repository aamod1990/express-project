angular.module('app.registrationController',['app.homeServices'])
    .controller('registrationController', function($scope,$rootScope,$location,AuthService) {
        $scope.userRegistration = function(){
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            // call userRegistration from service
            AuthService.userRegistration($scope.registrationForm)
            .then(function successCallback(response) {                  //call when status code between 200 to 299
                if(response.status === 200 && response.data.status === true){
                    $scope.disabled = false;
                    $scope.registrationForm = {};
                    $location.path('/login');
                }
                else if(response.status === 200 && response.data.status === false){
                    $scope.error = true;
                    $scope.errorMessage = response.data.message;
                }else{
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.registrationForm = {};
                }
            }, function errorCallback(err) {                           //call when status code more then 299
                $scope.error = true;
                $scope.errorMessage = "Something went wrong!";
                $scope.disabled = false;
                $scope.registrationForm = {};

            });

        }


    });