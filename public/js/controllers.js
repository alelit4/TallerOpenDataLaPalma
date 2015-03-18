var demoApp = angular.module('demoApp', ['ngResource']);

/* Controlador de la vista del Mapa */
demoApp.controller('MapCtrl', function ($scope, $resource, $http, $window, $location) {

    /* Inicialización */
    $scope.currentComentarioNombre = "";
    $scope.currentComentarioIdPoint = "";
    $scope.currentComentarioLugar = "";
    $scope.currentComentarioComentario = "";
    $scope.comentarios;

    /* Inicialización del Mapa */
    $scope.map = new GMaps({
        el: '#map',
        lat: 28.712428,
        lng: -17.859723,
        zoom: 10
    });


    /* Función para pedir todos los puntos para marcar en el mapa */
    var updateData = function () {
        // Accessing the Angular $http Service to send data via REST Communication to Node Server.
        $http({
            method: 'GET',
            url: '/puntos',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.codeStatus = data;
            console.log('--->' + data);
            $scope.puntos = data;
            for (var i = 0; i < $scope.puntos.length; i++) {
                console.log('Soy el punto ' + $scope.puntos[i].nombre);
                var marker = $scope.map.addMarker({
                    lat: $scope.puntos[i].geo[0],
                    lng: $scope.puntos[i].geo[1],
                    title: $scope.puntos[i]._id,
                    icon: "/images/punto.png",
                    infoWindow: {
                        content: '<p>Soy ' + $scope.puntos[i].nombre + '</p>'
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
    //var timer = setInterval(function () {
    //    $scope.$apply(updateData);
    //}, 10000);


    /* To add a marker to our map */
   // $scope.map.addMarker({
   //     lat: 28.300,
   //     lng: -16.612,
   //     title: 'Marker with InfoWindow',
   //     infoWindow: {
   //         content: '<p>HTML Content</p>'
   //     }
   // });

    /* Petición para generar un nuevo comentario */
    $scope.send = function () {
        $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
            method: 'POST',
            url: '/comentario',
            headers: {'Content-Type': 'application/json'},
            data:  {
                "nombre": $scope.currentComentarioNombre,
                "comentario": $scope.currentComentarioComentario,
                "idPoint": $scope.currentComentarioIdPoint
            }
        }).success(function (response) {
            console.log('ok' + response);
            $scope.success = true;
            updateComments();
        }).error(function (response) {
            console.log("error"); // Getting Error Response in Callback
        });
    };


    /* Petición para obtener todos los comentarios de un lugar */
    var updateComments = function () {
        // Accessing the Angular $http Service to send data via REST Communication to Node Server.
        $http({
            method: 'GET',
            url: '/comentario/' + $scope.currentComentarioIdPoint,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
            $scope.codeStatus = data;
            $scope.comentarios = data;

        }).error(function (data, status, headers, config) {
            console.log("error"); // Getting Error Response in Callback
            $scope.codeStatus = data || "Request failed";
            console.log($scope.codeStatus);
        });
    };

    /* Para saber que lugar elegimos del SelectBox */
    $scope.changeFunc = function (opt) {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        if (opt === 0) {
            $scope.currentComentarioIdPoint = selectedValue;
        }
        updateComments();
    };


    /* La primera llamada para sacar los puntos de interés */
    updateData();

});

demoApp.controller('HomeCtrl', function ($scope, $resource, $http, $window, $location) {

});