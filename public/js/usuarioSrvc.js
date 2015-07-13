angular.module('recadoMania').factory('usuarioSrvc',['$http', '$q', 'API_URL', function($http, $q, API_URL) {

    var saveURL = API_URL + 'nuevoUsuario';

    return {
        guardarUsuario: function(usuario) {
            var deferred = $q.defer();
            console.log('UsuarioSrvc hace un POST de:', usuario)
            $http({method: 'POST', url: saveURL, data: usuario})
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response, status) {
                        deferred.reject(response, status);
                    });
                return deferred.promise;

        }
    }
}])


