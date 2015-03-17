//App routes  
module.exports = function (app) {

    var utilities = require('../app/controllers/utilities');
    /* Home Page */
    app.get('/', utilities.index);

    // Mapa
    app.get('/mapa', utilities.mapa);
//    app.post('/mapa',utilities.addMarker);

    // Puntos
    app.post('/punto',utilities.addMarker);
    app.get('/puntos',utilities.allPoints);

}