(function() {
  'use strict';

  angular
    .module('PersonalityApp')
    .controller('profileController', profileController);

    function profileController($http) {
      //vm = view model
      var vm = this;

      vm.message = 'Hello';
    }
})();