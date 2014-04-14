'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularTodoApp'));

  var MainCtrl,
    scope,
    localStorageService,
    store;

  // Initialize the controller and mocks
  beforeEach(inject(function ($controller, $rootScope, _localStorageService_) {
    store = []; //clear the store before each test
    scope = $rootScope.$new();
    localStorageService = _localStorageService_;

    //mock localStorageService get/set
    spyOn(localStorageService,'get').andCallFake(function(key){
      return store[key];
    });
    spyOn(localStorageService,'set').andCallFake(function(key, val){
      store[key] = val;
    });

    //Instantiate controller to test
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: localStorageService
    });
  }));

  it('should retrieve "todos" from the store and assign to scope', function () {
    expect(localStorageService.get).toHaveBeenCalledWith('todos');
    expect(scope.todos.length).toBe(0);
  });

  it('should add items to the list and update the store for key = "todos"', function () {
    scope.todo = 'Test 1';
    scope.addTodo();
    scope.$digest();
    expect(localStorageService.set).toHaveBeenCalledWith('todos', jasmine.any(String));
    expect(scope.todos.length).toBe(1);

    //<editor-fold desc="old code">
    //expect(localStorageService.add).toHaveBeenCalled();
    //expect(localStorageService.add.mostRecentCall.args[0]).toEqual('todos');
    //</editor-fold>
  });

  it('should remove items to the list and update the store', function() {
    scope.todo = 'Test 1';
    scope.addTodo();
    scope.$digest();
    //reset call count
    localStorageService.set.reset();

    scope.removeTodo(0);
    scope.$digest();
    expect(localStorageService.set).toHaveBeenCalledWith('todos', jasmine.any(String));
    expect(scope.todos.length).toBe(0);
  });
});
