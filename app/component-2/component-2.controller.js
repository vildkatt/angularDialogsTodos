angular.module('app.component2')

.controller('TaskCalendarController', function($scope, $http, $modal, tasks) {
    'use strict';

  var dayFilter, weekFilter, monthFilter, selected, tDate;

    $scope.currentPage = 1;
    $scope.tasksPerPage = 10;
    $scope.filteredTasks = null;


    $scope.tasks = tasks.data;
    $scope.data = tasks.data;

    dayFilter = function(task) {
        tDate = new Date(task.date * 1000);
        selected = false;

        if ($scope.selectedDate.getDate() === tDate.getDate() &&
            $scope.selectedDate.getMonth() === tDate.getMonth() &&
            $scope.selectedDate.getFullYear() === tDate.getFullYear()) {
            selected = true;
        }
        return selected;
    };

    weekFilter = function(task) {
        var selectedWeekday, daysAfter, daysBefore, margin, selected, tDate, taskDateDays, selectedDateDays;
        tDate = new Date(task.date * 1000);

        selectedWeekday = $scope.selectedDate.getDay();

        if (selectedWeekday !== 0) {
            daysBefore = -(selectedWeekday - 1);
            daysAfter = 7 - selectedWeekday;
        } else {
            daysBefore = -6;
            daysAfter = 0;
        }

        taskDateDays = Math.floor(tDate.getTime() / (24 * 60 * 60 * 1000));
        selectedDateDays = Math.floor($scope.selectedDate.getTime() / (24 * 60 * 60 * 1000));
        margin = taskDateDays - selectedDateDays;
        selected = false;
        if (margin <= daysAfter && margin >= daysBefore) {
            selected = true;
        }
        return selected;
    };

    monthFilter = function(task) {
        tDate = new Date(task.date * 1000);

        selected = false;
        if ($scope.selectedDate.getMonth() === tDate.getMonth() && $scope.selectedDate.getFullYear() === tDate.getFullYear()) {
            selected = true;
        }
        return selected;
    };

    $scope.selectedDate = new Date();
    $scope.calendarFilter === undefined;

    $scope.setFilter = function(filter) {
        switch (filter) {
            case 'day':
                $scope.calendarFilter = dayFilter;
                break;
            case 'week':
                $scope.calendarFilter = weekFilter;
                break;
            case 'month':
                $scope.calendarFilter = monthFilter;
                break;
        }
    };

    $scope.setColor = function(task) {
        var taskPriority = task.priority;
        switch (taskPriority) {
            case '1':
                return { "background-color": "yellow" };
            case '2':
                return { "background-color": "orange" };
            case '3':
                return { "background-color": "red" };
        }
    };

    $scope.showDetailedInfo = function(task) {
        var modalInstance = $modal.open({
            templateUrl: '/component-2/modal-dialog/modal-task-info.tpl.html',
            controller: 'displayTask',
            size: 'medium',
            resolve: {
                displayedTask: function() {
                    var date, day, month, year;
                    return {
                        "id": task.id,
                        "title": task.title,
                        "category": task.category,
                        "priority": task.priority,
                        "description": task.description,
                        "date": task.date,
                        "status": task.status
                    };
                }
            }
        });

        modalInstance.result.then(function(data) {
            for (var i = 0; i < $scope.data.tasks.length; i++) {
                if ($scope.data.tasks[i].id == data.id) {
                    $scope.data.tasks[i].status = data.status;
                    break;
                }
            }
        });
    }

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    angular.copy(tasks, $scope.data.tasks);

})

.controller('displayTask', function($scope, $modalInstance, displayedTask, tasks) {
    'use strict';

    $scope.data = {
        information: {}
    };
    angular.copy(displayedTask, $scope.data.information);

    $scope.editTask = function(selectedTask) {
        var task = $scope.selectedTask;
        var dataObj = {
            id: selectedTask.id,
            title: selectedTask.title,
            category: selectedTask.category,
            priority: selectedTask.priority,
            description: selectedTask.description,
            date: selectedTask.date,
            status: selectedTask.status
        };

        $modalInstance.close($scope.data.information);
    };

    $scope.cancel = function(data) {
        $modalInstance.close(data);
    };

});
