angular.module('recadoMania').controller('crearServicioCtrl',['$scope', 'servicioSrvc', '$mdDialog', '$window', function($scope, servicioSrvc, $mdDialog, $window) {

    $scope.servicio = {
       "oferta" : "oferta"   
    }

    // $( document ).ready(function() {
    //     $( "#precio" ).click(function( event ) {
    //       alert("esto sí funciona");
    //       $("#precio").text("");
    //     });
    // });

    $scope.submit = function() {
        console.log('controller',$scope.servicio);

       if (typeof $scope.servicio.title === "undefined") {
          $("#errorMessage").text("Por favor introduce un Titulo");
          $("#errorMessage").css({ 'color': 'red', 'font-size': '150%' });
          return false;
        } else if (typeof $scope.servicio.descripcion === "undefined"){
          $("#errorMessage").text("Por favor introduce una Descripcion");
          $("#errorMessage").css({ 'color': 'red', 'font-size': '150%' });
          return false;
        } else if (typeof $scope.servicio.oferta === "undefined" ){
          $("#errorMessage").text("Por favor marcalo como oferta o demanda");
          $("#errorMessage").css({ 'color': 'red', 'font-size': '150%' });
          return false;
        } else if (typeof $scope.servicio.precio === "undefined"){
          $("#errorMessage").text("Por favor introduce un precio");
          $("#errorMessage").css({ 'color': 'red', 'font-size': '150%' });
          return false;
        } else if (typeof $scope.servicio.descripcion === "undefined"){
          $("#errorMessage").text("Por favor introduce una Descripcion");
          $("#errorMessage").css({ 'color': 'red', 'font-size': '150%' });
          
          return false;
        } else {
        //$("#errorMessage").hide();
        $("#errorMessage").text("");


        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/partials/dialog-template.html',
                locals: { servicio: $scope.servicio }
            })
        .then(function(answer) {
            servicioSrvc.guardarServicio($scope.servicio)
                toastr["success"]("Recado creado con éxito!")
                $window.location.href = '#/main'  
            
        }, function() {
        console.log('You cancelled the dialog.');
    });

      }
    }
}])

 function DialogController($scope, $mdDialog, servicio) {

        $scope.servicio = servicio
        console.log('dialog', servicio)
        $scope.cancel = function() {
            $mdDialog.cancel();
            return false;
            console.log("Edito el servicio");
        }
        $scope.answer = function(answer) {
            $mdDialog.hide(answer)
            console.log('$mdDialog answer', answer)
        }
    }

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}