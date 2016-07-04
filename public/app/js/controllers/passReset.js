'use strict';

angular
  .module('app')
  .controller('PassResetController', PassResetController);

function PassResetController(AuthService) {

  var PassReset = this;

  PassReset.reset = function () {
    AuthService.passReset(PassReset.user);
  }

}
