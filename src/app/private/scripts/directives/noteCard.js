'use strict';

/**
 * @ngdoc directive
 * @name playerApp.directive:contentPlayer
 * @description
 * # contentPlayer
 */
angular.module('playerApp').directive('noteCard', function () {

    return {
        templateUrl: 'views/note/noteCard.html',
        restrict: 'E',
        scope: {
            shownotecard: '='
        },
        link: function (scope, element, attrs) {
            
                scope.showNoteCard = scope.shownotecard; 
                console.log('called');
                
        },
        controller: 'NoteCtrl'
    };
});