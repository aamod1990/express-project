angular.module('app.directives',[])
.directive('dynamic', function () {
  	return {
      link: function ($rootScope, ele, attrs) {
        console.log("call directive");
      }
    };
})