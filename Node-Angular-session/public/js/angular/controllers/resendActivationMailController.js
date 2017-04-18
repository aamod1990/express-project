angular.module('app.resendActivationMailController',['app.homeServices'])
    .controller('resendActivationMailController', function($scope,$rootScope,$location,AuthService) {
        $scope.resendMail = function(){
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            AuthService.resendMail($scope.mailDetails)
                .then(function successCallback(response){
                    if(response.status === 200 && response.data.status === true){
                        $scope.disabled = false;
                        $scope.mailDetails = {};
                        $( "#resend-activation-mail" ).button().click();
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
                        $scope.mailDetails = {};
                    }
                },function errorCallback(error){
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                    $scope.mailDetails = {};
                })

        }
    });