import angular from 'angular';
import uiRouter from 'angular-ui-router';
import postFactory from 'factories/posts';
import postsController from 'controllers/posts';
import signupCtrl from 'controllers/signup';

const app = angular.module('l7Shop', [uiRouter, postFactory.name]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('posts', {
            url: '/',
            template: require('html/posts.html'),
            controller: postsController
        })
        .state('signup', {
            url: '/signup',
            template: require('html/signup.html'),
            controller: signupCtrl
        })
        .state('about', {
            url: '/about',
            template: require('html/about.html')
        });

    $locationProvider.html5Mode(true);
});

export default app;
