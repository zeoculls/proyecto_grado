angular.module('recadoMania',['ngRoute', 'ngMaterial']);


angular.module('recadoMania').config(["$routeProvider", function($routeProvider) {
    
    $routeProvider

    .when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'serviciosCtrl'
    })
    
    .when('/detalle/:ItemId', {
        templateUrl: 'partials/detalle.html',
        controller: 'DetalleCtrl'
    })

    .when('/crearservicio', {
        templateUrl: 'partials/crearServicio.html', 
        controller: 'crearServicioCtrl'
    })

    .when('/buscar', {
        templateUrl: 'partials/buscar.html',
        controller: 'BuscarServicios'
    })


    .when('/registrar', {
        templateUrl: 'partials/registrar.html'
    })

    .otherwise({
        redirectTo: '/main'
    })

}]);




angular.module('recadoMania')
    .constant('API_URL', 'https://serviciomania.herokuapp.com/');
//angular.module('recadoMania')
//    .constant('API_URL', 'http://127.0.0.1:4000/');
//angular.module('recadoMania')
//    .constant('API_URL', 'http://192.168.0.159:4000/');



