angular.module('recadoMania').factory('usuarioSrvc',['$http', '$q', 'API_URL', function($http, $q, API_URL) {

    var saveURL = API_URL + 'nuevoUsuario';
    var googleURL = API_URL + 'auth/google';

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
        // loginUsuario: function(usuario) {
        //     var deferred = $q.defer();
        //     console.log('Usuario Login hace un GET de:', usuario)
        //     $http({method: 'GET', url: googleURL, data: usuario})
        //             .success(function(response) {
        //                 deferred.resolve(response);
        //             })
        //             .error(function(response, status) {
        //                 deferred.reject(response, status);
        //             });
        //         return deferred.promise;
        // }
    }
}])


