angular.module('app.forgotPasswordController',['app.homeServices'])
    .controller('forgotPasswordController', function($scope,$rootScope,$location,AuthService) {
        $scope.forgotPassword = function(){
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            AuthService.forgotPassword($scope.loginDetails)
                .then(function successCallback(response){
                    if(response.status === 200 && response.data.status === true){
                        $scope.disabled = false;
                        $scope.loginDetails = {};
                        $( "#forgotpassword" ).button().click();
                        $location.path('/login');
                    }
                    else if(response.status === 200 && response.data.status === false){
                        $scope.error = true;
                        $scope.disabled = false;
                        $scope.errorMessage = response.data.message;
                    }else{
                        $scope.error = true;
                        $scope.errorMessage = "Something went wrong!";
                        $scope.disabled = false;
                        $scope.loginDetails = {};
                    }
                },function errorCallback(error){
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.loginDetails = {};
                })

        }
    });