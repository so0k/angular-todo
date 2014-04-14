'use strict';

angular.module('angularTodoApp')
  .controller('MainCtrl',['$scope','localStorageService',function ($scope, localStorageService) {

    var todosInStore =  localStorageService.get('todos');
    $scope.todos = todosInStore && todosInStore.split('\n') || [];
    //$scope.todos = ['Item 1', 'Item 2', 'Item 3'];

    $scope.$watch('todos', function(){
      localStorageService.set('todos', $scope.todos.join('\n'));
    },true);

    $scope.addTodo  = function() {
      $scope.todos.push($scope.todo);
      $scope.todo = '';
    };

    $scope.removeTodo = function(index) {
      $scope.todos.splice(index,1);
    };
  }]);
