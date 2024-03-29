angular.module('app.component3')
.controller('component3Controller', function($scope, $http, $modal, response){
   'use strict';


   $scope.tasks = response.data;
   $scope.taskName = '';
   $scope.taskCategory = '';
   $scope.taskDate = '';
   $scope.taskPriority = '';

      $scope.data = response.data;
     $scope.viewby = 10;
     $scope.totalItems = $scope.data.length;
     $scope.currentPage = 1;
     $scope.itemsPerPage = $scope.viewby;
     $scope.maxSize = 5; //Number of pager buttons to show

     $scope.setPage = function (pageNo) {
       $scope.currentPage = pageNo;
     };

     $scope.pageChanged = function() {
       console.log('Page changed to: ' + $scope.currentPage);
     };

   $scope.setItemsPerPage = function(num) {
     $scope.itemsPerPage = num;
     $scope.currentPage = 1; //reset to first page
   }

   $scope.selectedTask = null;

   $scope.setSelected = function (selectedTask) {
     $scope.selectedTask = selectedTask;

   };

   $scope.openModal = function () {
   var modal = $modal.open({
     templateUrl: '/component-1/modal-dialog/modal-dialog.tpl.html',
     controller: 'MyModalController'
   });

   modal.result.then(function(addedTask) {
            $scope.data.push(addedTask);
        });
   };

   $scope.openEditModal = function () {
   var modal = $modal.open({
   templateUrl: '/component-1/edit-dialog/edit-dialog.tpl.html',
   controller: 'EditModalController',
   resolve: {
              selectedTask: function() {
                  return $scope.selectedTask;
              }
          }
   });
   modal.result.then(function(selectedTask) {
         angular.copy(selectedTask, $scope.selectedTask);
      });

   };

 }).controller('MyModalController', ['$scope', '$modalInstance', '$http', function($scope, $modalInstance, $http, addedTask){
      'use strict';

      $scope.addedTask =  {
      "title": '',
      "category": '',
      "date": '',
      "priority": '',
      "description": ''
   };

   $scope.today = function() {
   $scope.addedTask.date = new Date();
 };
 $scope.today();

 $scope.clear = function () {
   $scope.addedTask.date = null;
 };


 $scope.openDP = function($event) {
   $event.preventDefault();
   $event.stopPropagation();
   $scope.opened = true;
 };

 $scope.dateOptions = {
   formatYear: 'yy',
   startingDay: 1
 };

   $scope.ok = function() {
     $modalInstance.close($scope.addedTask);
   };

   $scope.cancel = function() {
     $modalInstance.dismiss();
       };


   }]).controller('EditModalController', ['$scope', '$modalInstance', '$http', 'selectedTask', function($scope, $modalInstance, $http, selectedTask){
      'use strict';
      $scope.selectedTask = {
        "title" : selectedTask.title,
        "category" : selectedTask.category,
        "date" : selectedTask.date,
        "priority" : selectedTask.priority,
        "description" : selectedTask.description
      };
      $scope.ok = function() {
        $modalInstance.close($scope.selectedTask);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss();
    };

   }]);
