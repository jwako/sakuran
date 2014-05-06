var graphControllers = angular.module('graphControllers', []);

graphControllers.controller('PrefectureCtrl', function($scope, $http) {

	$scope.getPrefectureData = function () {
    // var photo_scope = angular.element('#photo').scope();
    $http({
      method: 'GET',
      url:'/v1/graphs/prefectures'
    }).
    success(function (data) {
      $scope.data = data.prefectures;
      $scope.error = '';
    }).
    error(function (data, status) {
      if (status === 404) {
        $scope.error = 'That data does not exist';
      } else {
        $scope.error = 'Error: ' + status;
      }
    });
  };

  $scope.getPrefectureData();
});
