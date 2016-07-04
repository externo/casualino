'use strict';

angular
  .module('app')
  .factory('AuthService', AuthService);

function AuthService($location, $http) {

  return {
    login: login,
    passReset: passReset
  };

  function login(user, success, error) {
    $http.post('http://casualino-server.kataraga.com/login', {
      "email": user.email,
      "password": user.password
    })
      .success(success)
      .error(error);
  }

  function passReset(user, success, error) {
    $http.post('http://casualino-server.kataraga.com/reset', {
      "email": user.email,
      "pass": user.pass,
      "newPass": user.newPass
    })
      .success(success)
      .error(error);
  }

}