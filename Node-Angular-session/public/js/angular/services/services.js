angular.module('app.homeServices',[])
.factory('AuthService', ['$http', '$q',
	function($http, $q) {
        return ({
            getUserStatus: getUserStatus,
            userRegistration:userRegistration,
            login            : login,
            logout           : logout,
            forgotPassword   : forgotPassword,
            resendMail       : resendMail
        });
		function getUserStatus() {
            var deffered = $q.defer();
            $http({
                method: 'GET',
                url: '/user/status'
            }).then(function successCallback(response) {  //call when status code between 200 to 299
                deffered.resolve(response);
            }, function errorCallback(response) {         //call when status code more then 299
                deffered.reject(response);
            });
            return deffered.promise;
		}
		function userRegistration(userForm){
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: '/user/registration',
                headers: {
                    'Content-Type': "application/json"
                },
                data: userForm
            }).then(function successCallback(response) {            //call when status code between 200 to 299
                deffered.resolve(response);
            }, function errorCallback(err) {                        //call when status code more then 299
                deffered.reject(err);
            });
            return deffered.promise;
        }
        function login(loginData){
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: '/user/login',
                headers: {
                    'Content-Type': "application/json"
                },
                data: loginData
            }).then(function successCallback(response) {
                deffered.resolve(response);
            }, function errorCallback(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        }
        function logout(){
            var logoutData = {
                "key":"logout",
            }
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: '/user/logout',
                headers: {
                    'Content-Type': "application/json"
                },
                data: logoutData
            }).then(function successCallback(response) {
                deffered.resolve(response);
            }, function errorCallback(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        }
        function forgotPassword(loginDetails){
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: '/user/forgotpassword',
                headers: {
                    'Content-Type': "application/json"
                },
                data: loginDetails
            }).then(function successCallback(response) {
                deffered.resolve(response);
            }, function errorCallback(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        }
        function resendMail(mailDetails){
            var deffered = $q.defer();
            $http({
                method: 'POST',
                url: '/user/resendactivationmail',
                headers: {
                    'Content-Type': "application/json"
                },
                data: mailDetails
            }).then(function successCallback(response) {
                deffered.resolve(response);
            }, function errorCallback(response) {
                deffered.reject(response);
            });
            return deffered.promise;
        }
	}
]);