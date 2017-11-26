var restify = require('restify'); // usado como web service framework API REST
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
var routes = require('./routes/hotelRoutes.js'); // Usando metodo de MVC
routes.register(server);

server.listen(8080, function() {
    console.log('Escuchando en: ', server.name, server.url); // servidor iniciado
});
server.get(/.*/, restify.plugins.serveStatic({
  directory: './public', // La carpeta public como punto de desarrollo del frontend
  default:  'index.html'
}));
