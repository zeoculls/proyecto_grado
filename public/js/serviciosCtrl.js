angular.module('recadoMania').controller('serviciosCtrl',['$scope', 'servicioSrvc',  function($scope, servicioSrvc) {
    servicioSrvc.recuperarServicios()
    .then(function(servicios) {
        console.log('Recupera servicios',servicios)
        $scope.servicios = servicios;
        if(!user)
            $scope.user=user;
    })
}])


angular.module('recadoMania').controller('BuscarServicios',['$scope', 'servicioSrvc',  function($scope, servicioSrvc) {
    servicioSrvc.recuperarServicios()
    .then(function(servicios) {
        console.log('Buscar servicios',servicios)
        $scope.servicios = servicios;
    })
}])




angular.module('recadoMania').controller('DetalleCtrl',['$scope', 'servicioSrvc', '$routeParams',  function($scope, servicioSrvc, $routeParams) {
    //controlador que maneja el partial detalle
    //recoge de la URL el numero ID para poder
    $scope.whichItem = $routeParams.ItemId;

    servicioSrvc.recuperarServicioId($scope.whichItem)
     .then(function(servicio) {
         console.log('Buscar servicio id controller devuelve a la web',servicio)
         $scope.servicioId = servicio;
    })


    // $scope.imagePath = 'https://material.angularjs.org/img/washedout.png';

}])