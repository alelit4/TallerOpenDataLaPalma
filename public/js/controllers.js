var demoApp = angular.module('demoApp', ['ngResource']);

/* All Trackings Map Controller */
demoApp.controller('MapCtrl', function ($scope, $resource, $http, $window, $location) {

    /* Init the map */
    $scope.map = new GMaps({
        el: '#map',
        lat: 28.300,
        lng: -16.612,
        zoom: 10
    });

    $scope.pos;
    var centrarMapa = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                $scope.pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                $scope.map.setCenter($scope.pos);
            }, function () {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
    };

    centrarMapa();


    /* To get all trackings with a GET method */
    var updateData = function () {
        // Accessing the Angular $http Service to send data via REST Communication to Node Server.
        $http({
            method: 'GET',
            url: '/getalltrackings',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.codeStatus = data;
            $scope.trackings = data;
            for (var i = 0; i < $scope.trackings.length; i++) {
                console.log('Soy el tracking ' + $scope.trackings[i].idvehiculo);
                $scope.map.addMarker({
                    lat: $scope.trackings[i].geo[1],
                    lng: $scope.trackings[i].geo[0],
                    title: $scope.trackings[i].idvehiculo,
                    details: {
                        sentido: $scope.trackings[i].sentido,
                        author: 'Dephisit'
                    },
                    icon: "/images/point.png",
                    infoWindow: {
                        content: '<p>Soy vehiculo ' + $scope.trackings[i].idvehiculo + '</p>'
                    }
                });
            }
        }).error(function (data, status, headers, config) {
            console.log("error"); // Getting Error Response in Callback
            $scope.codeStatus = response || "Request failed";
            console.log($scope.codeStatus);
        });
    };


    /* To refresh data */
    var timer = setInterval(function () {
        $scope.$apply(updateData);
    }, 10000);

    /* The first call to get all trackings */
   // updateData();
   //
   // /* To add a marker to our map */
   // $scope.map.addMarker({
   //     lat: 28.300,
   //     lng: -16.612,
   //     title: 'Marker with InfoWindow',
   //     infoWindow: {
   //         content: '<p>HTML Content</p>'
   //     }
   // });

    $scope.isActive = function (route) {

        var path = $location.absUrl().split("/");
        console.log(route === path[path.length - 1]);
        //console.log($location.absUrl());
        //console.log(route === $location.path().toString);
        return route === path[path.length - 1];
    }
});
