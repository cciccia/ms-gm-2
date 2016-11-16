import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';

import MainCtrl from './controllers/main.js'

angular.module('msgm', [
    uiRouter,
    ngResource,
    ngMaterial
])
    .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$httpProvider',
	     function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider) {
		 $urlMatcherFactoryProvider.strictMode(false);

		 $urlRouterProvider.when('', '/home');
		 $urlRouterProvider.otherwise('/home');

		 $stateProvider.state('root', {
		     url: '/home',
		     templateUrl: '/public/templates/home.html',
                     controller: 'MainCtrl',
                     controllerAs: 'vm'
		 });
	     }])
    .controller('MainCtrl', MainCtrl)
