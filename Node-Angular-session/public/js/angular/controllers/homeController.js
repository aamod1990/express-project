angular.module('app.homeController',['app.homeServices'])
    .controller('homeController', function($scope,$rootScope,$location,AuthService) {
        $scope.logout = function(){
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            AuthService.logout()
                .then(function successCallback(response){
                    if(response.status === 200 && response.data.status === true){
                        $scope.disabled = false;
                        $location.path('/login');
                    }
                    else{
                        $scope.error = true;
                        $scope.errorMessage = "Something went wrong!";
                        $scope.disabled = false;
                    }
                },function errorCallback(error){
                    $scope.error = true;
                    $scope.errorMessage = "Something went wrong!";
                    $scope.disabled = false;
                })

        }
    });