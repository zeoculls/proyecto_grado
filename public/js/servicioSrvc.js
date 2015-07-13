angular.module('recadoMania').factory('servicioSrvc',['$http', '$q', 'API_URL', function($http, $q, API_URL) {

    var saveURL = API_URL + 'save';
    var getURL = API_URL + 'servicios';
    var getID = API_URL + 'servicioId';

    //guarda un servicio y recupera todos.
    return {

        guardarServicio: function(servicio) {
            var deferred = $q.defer();
            console.log('servicioSrvc hace un POST de:', servicio)
            $http({method: 'POST', url: saveURL, data: servicio})
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response, status) {
                        deferred.reject(response, status);
                    });
                return deferred.promise;

        },
        recuperarServicioId: function(servicio) {

            var clave = {
                  "id": servicio
            }

            var deferred = $q.defer();

            $http({method: 'POST', url: getID, data: clave})
                    .success(function(response) {
                        deferred.resolve(response);
                        console.log('Respuesta del SERVER:', response);
                    })
                    .error(function(response, status) {
                        deferred.reject(response, status);
                    });
                return deferred.promise;
        },
        recuperarServicios: function() {
            var deferred = $q.defer();
            $http({method: 'GET', url: getURL})
                    .success(function(response) {
                        deferred.resolve(response);
                        console.log('Recuperar servicio GET servicio',response)
                    })
                    .error(function(response, status) {
                        deferred.reject(response, status);
                    });
                return deferred.promise;
        }
    }
}])