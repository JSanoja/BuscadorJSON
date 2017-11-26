var app=angular.module('hoteles', []); // inicializo angular
var estrellas=0;
var menu =0;
app.controller('main', function($scope, $http) {
// console.log("Iniciado angular");

	// Cuando se cargue la página, pide del API los datos de hoteles
	$http.get('/api/hoteles')
		 	.then(function(data) { // cuando tenga respuesta del servidor
		   		$scope.hoteles = data.data; // construyo los datos
		 			// console.log(data); // muestro datos
		 	}, function(data) { // si hay error
		 		console.log('Error: ' + data);
			});
	$scope.menumovil = function () { // controlo el menu para moviles
		if (menu==1){ // si el menu esta abierto lo cierro y uso menu como flag
			$scope.clase = "cerrar";
			menu=0;
		} else { // si el menu esta cerrado lo abro y uso menu como flags
			$scope.clase = "abrir";
			menu=1;
		};
			//console.log("aca");
	};
	$scope.BuscarS = function(est) { // funcion para la busqueda de estrellas
		estrellas= est;
		// console.log(estrellas);
		$scope.BuscarHotel();
	};
	$scope.BuscarHotel = function() { // funcion para la busqueda de hoteles
		var buscarnombre = $scope.campohoteles;
		var peticion = '/api/hoteles'; // la peticion que muestra todos los hoteles
		if (buscarnombre) {
			switch(estrellas) {
	    case 0:
					peticion = '/api/hoteles?nombre='+buscarnombre; // la peticion que muestra hoteles de todas las estrellas con el nombre
	        break;
	    default:
					peticion = '/api/hoteles?nombre='+buscarnombre+'&estrellas='+estrellas; // la peticion que filtra los hoteles por nombre y cantidad de estrellas
	        break;
			}
		};
		if (estrellas!=0 & !buscarnombre) { // la peticion que filtra por estrella y no por nombre
			peticion = '/api/hoteles?estrellas='+estrellas;
			// console.log(peticion);
		};
		$http.get(peticion)    // realizo la peticion
			 	.then(function(data) {
			   		$scope.hoteles = data.data; // contruyo los nuevos datos con la respuesta
			 			// console.log(data);
			 	}, function(data) {
			 		console.log('Error: ' + data);
				});

	};
});

jQuery(document).ready(function () {
	jQuery(".main").fadeIn(function () {  //para mostrar el main cuando se cargue el documento
	});
});
