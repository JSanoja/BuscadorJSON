var hotelController = require('../controllers/hotelController.js'); //incluyo controlador

module.exports = class Routes {
    static register(server) {
        const controller = new hotelController();
        server.get('/api/hoteles/', (req,res,next) => //escucho peticiones a /api/hoteles
        {
            controller.get(req,res);
            next();
        });
        // no hace falta escuhar peticiones post sin embargo dejo el codigo de lo que seria guardar un dato en data
        // server.post('/api/hoteles/', (req,res,next) =>  metodo post no usado,
        // {
        //     controller.post(req,res);
        //     next();
        // });
    }
}
