var sakuranApp = angular.module('sakuranApp', [
	'mapControllers',
	'graphControllers',
	'mapServices',
	'graphDirectives'
]);

// For turbolinks
$(document).on('page:load', function() {
  $('[ng-app]').each(function () {
		module = $(this).attr('ng-app');
    angular.bootstrap(this, [module]);  	
  });
});
