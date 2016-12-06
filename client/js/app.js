import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngMaterial from 'angular-material';
import ngFormly from 'angular-formly';
import formlyBootstrap from 'angular-formly-templates-bootstrap';
import lbServices from './services/lbServices';

import MainCtrl from './controllers/main';
import GameEditCtrl from './controllers/gameEdit';
import AlignmentEditCtrl from './controllers/alignmentEdit';
import RoleEditCtrl from './controllers/roleEdit';

require('lodash');

require("angular-xeditable");

angular.module('msgm', [
    uiRouter,
    ngResource,
    ngMaterial,
    ngFormly,
    formlyBootstrap,
    lbServices,
    'xeditable'
])
    .config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', '$httpProvider', 'formlyConfigProvider',
	     function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $httpProvider, formlyConfigProvider) {
		 $urlMatcherFactoryProvider.strictMode(false);

		 $urlRouterProvider.when('', '/home');
		 $urlRouterProvider.otherwise('/home');

		 $stateProvider.state('root', {
		     url: '/home',
		     templateUrl: '/public/templates/home.html',
                     controller: 'MainCtrl',
                     controllerAs: 'vm'
		 });

                 // $stateProvider.state('gameAdd', {
		 //     url: '/game/add',
		 //     templateUrl: '/public/templates/gameEdit.html',
                 //     controller: 'GameEditCtrl',
                 //     controllerAs: 'vm'
		 // });

                 // $stateProvider.state('gameEdit', {
		 //     url: '/game/edit/:id',
		 //     templateUrl: '/public/templates/gameEdit.html',
                 //     controller: 'GameEditCtrl',
                 //     controllerAs: 'vm'
		 // });

                 $stateProvider.state('alignmentEdit', {
		     url: '/alignment/edit',
		     templateUrl: '/public/templates/alignmentEdit.html',
                     controller: 'AlignmentEditCtrl',
                     controllerAs: 'vm'
		 });

                 $stateProvider.state('roleEdit', {
		     url: '/role/edit/:id',
		     templateUrl: '/public/templates/roleEdit.html',
                     controller: 'RoleEditCtrl',
                     controllerAs: 'vm'
		 });

                 $stateProvider.state('roleAdd', {
		     url: '/role/add',
		     templateUrl: '/public/templates/roleEdit.html',
                     controller: 'RoleEditCtrl',
                     controllerAs: 'vm'
		 });

                 formlyConfigProvider.setType({
                     name: 'grid',
                     templateUrl: 'public/templates/grid.html',
                     controller: /*@ngInject*/ $scope => {
                         $scope.remove = row => {
                             _.remove($scope.model, row);
                         }
                     }
                 });

                 
	     }])
    .controller('MainCtrl', MainCtrl)
    .controller('GameEditCtrl', GameEditCtrl)
    .controller('AlignmentEditCtrl', AlignmentEditCtrl)
    .controller('RoleEditCtrl', RoleEditCtrl)

