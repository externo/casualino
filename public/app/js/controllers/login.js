'use strict';

angular
  .module('app')
  .controller('LoginController', LoginController);

function LoginController($location, $translate, AuthService, Notification) {

  var Login = this;

  Login.lang = 'en';

  $translate.use('en');

  Login.closeDialog = function () {

    console.log('closing');
    Login.dialogClosed = true;

  };

  Login.openDialog = function ($event) {

    $event.stopPropagation();
    console.log('opening');
    Login.dialogClosed = false;

  };

  Login.toggleLang = function () {

    if ($translate.use() == 'en') {
      $translate.use('bg');
    } else {
      $translate.use('en');
    }

    $translate(['LANG-CODE', 'LANG-MESSAGE']).then(function (translations) {
      Login.lang = translations['LANG-CODE'];
      Notification.primary(translations['LANG-MESSAGE']);
    });

  };

  Login.login = function () {

    AuthService.login(Login.user,
      function (res) {
        $translate('LOGIN-SUCCESS').then(function (translatedSavedMessage) {
          Notification.success(translatedSavedMessage + res.email);
        });
        Login.dialogClosed = true;
      },
      function (err) {
        $translate('LOGIN-ERROR').then(function (translatedSavedMessage) {
          Notification.error(translatedSavedMessage + err);
        });
      });

  };

  Login.reset = function () {

    AuthService.passReset(Login.user,
      function (res) {
        $translate('RESET-SUCCESS').then(function (translatedSavedMessage) {
          Notification.success(translatedSavedMessage + res.email);
        });
        $location.path("/login");
      },
      function (err) {
        $translate('RESET-ERROR').then(function (translatedSavedMessage) {
          Notification.error(translatedSavedMessage + err);
        });
      });

  };

}
