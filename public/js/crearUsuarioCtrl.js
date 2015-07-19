angular.module('recadoMania').controller('crearUsuarioCtrl',['$scope', 'usuarioSrvc', '$mdDialog', '$window', function($scope, usuarioSrvc, $mdDialog, $window) {


$scope.submit = function() {
    console.log('controller usuario',$scope.usuario);

    $mdDialog.show({
                    controller: DialogController1,
                    templateUrl: '/partials/dialogUser-template.html',
                    locals: { usuario: $scope.usuario }
                })
            .then(function(answer) {
                usuarioSrvc.guardarUsuario($scope.usuario)
                    toastr["success"]("Recado creado con éxito!")
                    $window.location.href = '#/main'  
                
            }, function() {
            console.log('Has cancelado el dialogo.');
        });
      }

}])

 function DialogController1($scope, $mdDialog, usuario) {

        $scope.usuario = usuario
        console.log('dialog', usuario)
        $scope.cancel = function() {
            $mdDialog.cancel();
            return false;
            console.log("Edito el usuario");
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

angular.module('recadoMania').controller('loginCtrl',['$scope', 'usuarioSrvc', '$window', function($scope, usuarioSrvc, $window) {


$(".email-signup").hide();
$("#signup-box-link").click(function(){
  $(".email-login").fadeOut(100);
  $(".email-signup").delay(100).fadeIn(100);
  $("#login-box-link").removeClass("active");
  $("#signup-box-link").addClass("active");
});
$("#login-box-link").click(function(){
  $(".email-login").delay(100).fadeIn(100);;
  $(".email-signup").fadeOut(100);
  $("#login-box-link").addClass("active");
  $("#signup-box-link").removeClass("active");
});

    console.log('controller login usuario!!!!! :',$scope.usuario);

    // usuarioSrvc.loginUsuario()
    //       .then(function(usuario) {
    //         $scope.usuario = usuario
    // })


}])



