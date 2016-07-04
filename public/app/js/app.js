(function () {

  'use strict';

  angular.module('app', [
    'ngRoute',
    'pascalprecht.translate',
    'ngAnimate',
    'ngLoadingSpinner',
    'ui-notification'
  ])
    .config([
      '$locationProvider',
      '$routeProvider',
      '$translateProvider',
      'NotificationProvider',
      function ($locationProvider, $routeProvider, $translateProvider, NotificationProvider) {
        $routeProvider.when('/login', {
          templateUrl: 'states/login.html'
        });
        $routeProvider.when('/pass-reset', {
          templateUrl: 'states/pass-reset.html'
        });
        $routeProvider.otherwise({redirectTo: '/login'});
        $translateProvider
          .translations('en', {
            'LANG-CODE': 'en',
            'LANG-MESSAGE': 'Your language now is English',
            'TITLE': 'Entrance',
            'LOGIN-BUTTON': 'Login',
            'RESET-BUTTON': 'Reset',
            'EMAIL': 'E-mail',
            'PASSWORD': 'Password',
            'OLD-PASSWORD': 'Old password',
            'NEW-PASSWORD': 'New password',
            'REPEAT-PASSWORD': 'Repeat password',
            'REQUIRED-FIELD': 'This field is required',
            'REPEAT-PASSWORD-MSG': 'Repeat the same password',
            'LOGIN-SUCCESS': 'You are logged in. Welcome ',
            'LOGIN-ERROR': 'You cannot log in: ',
            'RESET-SUCCESS': 'You changed your password successfully. Welcome ',
            'RESET-ERROR': 'You cannot change your password: '
          })
          .translations('bg', {
            'LANG-CODE': 'бг',
            'LANG-MESSAGE': 'Сменихте езика на Български',
            'TITLE': 'Вход',
            'LOGIN-BUTTON': 'Влез',
            'RESET-BUTTON': 'Ресет',
            'EMAIL': 'Поща',
            'PASSWORD': 'Парола',
            'OLD-PASSWORD': 'Стара парола',
            'NEW-PASSWORD': 'Нова парола',
            'REPEAT-PASSWORD': 'Повтори парола',
            'REQUIRED-FIELD': 'Това поле е задължително',
            'REPEAT-PASSWORD-MSG': 'Повтори същата парола',
            'LOGIN-SUCCESS': 'Влязохте в системата. Добре дошъл ',
            'LOGIN-ERROR': 'Има проблем с автентикацията: ',
            'RESET-SUCCESS': 'Успешно сменихте паролата си. Добре дошъл ',
            'RESET-ERROR': 'Не успяхте да смените паролата си: '
          })
          //.determinePreferredLanguage()
          //.preferredLanguage('en')
          .useSanitizeValueStrategy(null);

        NotificationProvider.setOptions({
          delay: 1000,
          startTop: 20,
          startRight: 10,
          verticalSpacing: 20,
          horizontalSpacing: 20,
          positionX: 'right',
          positionY: 'top'
        });
      }
    ]);

}());
