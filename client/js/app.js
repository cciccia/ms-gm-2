import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';
import ngFormly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import lbServices from './services/lbServices';

import MainCtrl from './controllers/main';
import AlignmentEditCtrl from './controllers/alignmentEdit';

angular.module('msgm', [
    uiRouter,
    ngResource,
    ngMaterial,
    ngFormly,
    formlyBootstrap,
    lbServices
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

                 $stateProvider.state('alignment.add', {
		     url: '/alignment/add',
		     templateUrl: '/public/templates/alignmentEdit.html',
                     controller: 'AlignmentEditCtrl',
                     controllerAs: 'vm'
		 });

                 $stateProvider.state('alignmentEdit', {
		     url: '/alignment/edit/:id',
		     templateUrl: '/public/templates/alignmentEdit.html',
                     controller: 'AlignmentEditCtrl',
                     controllerAs: 'vm'
		 });

                 
	     }])
    .controller('MainCtrl', MainCtrl)
    .controller('AlignmentEditCtrl', AlignmentEditCtrl)
