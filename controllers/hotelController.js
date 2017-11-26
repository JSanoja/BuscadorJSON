var datos = require('../data/data.json'); // uso los datos del json
var jsonQuery = require('json-query'); // usando jsonQuery para realizar la busqueda dentro de un json
function capitalizeFirstLetter(string) { // funcion que me capitaliza un string
    return string.charAt(0).toUpperCase() + string.slice(1);
};
module.exports = class hotelController { // controlador de la busqueda de los hoteles
    constructor() {
        this.hoteles = new Array();
        this.hoteles= datos;
    }
    get(req, res) {  // controlador para el get en /api/hoteles
        // res.json(datos);
        var data = this.hoteles; // obtengo el json
        // console.log(req.params);
        var resultado = jsonQuery('[**]', {data: data}).value; // inicializo el resultado con el valor default

        if (req.params.estrellas) {  // si existe el parametro estrellas /api/hoteles?estrellas=
          let estrellas = req.params.estrellas;
          let nombre = req.params.nombre;
          let buscarFinal ='[**][*stars='+estrellas+']'; // si no existe nombre hacer esta busqueda
          if (nombre) {  // si existe el parametro nombre y estrella /api/hoteles?estrellas=&nombre=
            let busquedaes = 'stars='+estrellas+']'; // construyo la busqueda de estrellas
            let nombremayus =  req.params.nombre.toLowerCase(); // conviero en minuscula nombre
            let nombreminus =  req.params.nombre.toUpperCase(); // convierto en mayuscula nombre
            let nombreCap= capitalizeFirstLetter(req.params.nombre); // capitalizo nombre
            let busquedanom = '[**][*name~'+nombre+'|name~'+nombremayus+'|name~'+nombreminus+'|name~'+nombreCap; // armo la estructura para buscar nombre en todas sus formas

            buscarFinal =busquedanom+ '&' + busquedaes; // armo la estructura final de la busqueda
          };
          console.log(buscarFinal); // muestro lo que quiero buscar en lso datos
          resultado = jsonQuery(buscarFinal, {data: data, allowRegexp:true},).value ; // set al resultado
        }
        else { // Si no tiene el parametro estrella
          if (req.params.nombre) { // si tiene el parametro nombre
            let nombre = req.params.nombre;  // nombre
            let nombremayus =  req.params.nombre.toLowerCase(); // convierto en minuscula nombre
            let nombreminus =  req.params.nombre.toUpperCase(); // convierto en mayuscula nombre
            let nombreCap= capitalizeFirstLetter(req.params.nombre); // capitalizo nombre
            let busquedanom = '[**][*name~'+nombre+'|name~'+nombremayus+'|name~'+nombreminus+'|name~'+nombreCap+']';
            console.log(busquedanom); // muestro lo que quiero buscar en lso datos
            resultado = jsonQuery(busquedanom, {data: data, allowRegexp:true},).value ; // set al resultado

          }
          else { // si no existen los parametros nombre y estrellas buscar en todo
              resultado = jsonQuery('[**]', {data: data}).value;
          };

        };

        res.send(200,resultado); // devuelvo el resultado

    };
    // no hace falta escuhar peticiones post sin embargo dejo el codigo de lo que seria guardar un dato en data
    // post(req, res) {
    //
    //     var hotel = {
    //         id:   req.body.sku,
    //         name:  req.body.asin,
    //         stars:   req.body.upc,
    //         price: req.body.title,
    //         image: req.body.image,
    //         amenities: req.body.amenities
    //     };
    //
    //     this.hoteles.push(buscar);
    //     res.send(201,res.header('Location', ""));
    // };
}
