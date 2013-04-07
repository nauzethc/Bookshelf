'use strict';

Bookshelf.factory('Shared', function($rootScope){
    var sharedService = {};

    // User
    sharedService.selectedUser = null;
    sharedService.selectUser = function(user) {
        this.selectedUser = user;
        this.broadcastUser(user);
    }
    sharedService.broadcastUser = function(user) {
        console.log("User changed to " + user.username + '!');
        $rootScope.$broadcast('userChanged');
    }


    // Alerts
    sharedService.alerts = [];
    sharedService.addAlert = function(level, message) {
        this.alerts.push( { 'level': 'alert-'+level, 'message': message });
        this.broadcastAlert();
    }
    sharedService.removeAlert = function(index) {
        this.alerts.splice(index, 1);
        this.broadcastAlert();
    }
    sharedService.broadcastAlert = function() {
        $rootScope.$broadcast('alertsChanged');
    }

    return sharedService;
});
