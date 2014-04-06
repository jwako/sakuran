var sakuranApp = angular.module('sakuranApp', [
	'mapControllers',
	'mapServices'
]);

// For turbolinks
$(document).on('page:load', function() {
  $('[ng-app]').each(function () {
		module = $(this).attr('ng-app');
    angular.bootstrap(this, [module]);  	
  });
});
