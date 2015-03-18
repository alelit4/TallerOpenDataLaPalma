//App routes  
module.exports = function (app) {

    var utilities = require('../app/controllers/utilities');

    // Vista del Home
    app.get('/', utilities.index);
    // Vista del Mapa
    app.get('/mapa', utilities.mapa);

    // Puntos
    app.post('/punto',utilities.addMarker);
    app.get('/puntos',utilities.allPoints);

    // Comentarios
    app.post('/comentario',utilities.addComment);
    app.get('/comentario/:id',utilities.getCommment);
    app.get('/comentarios',utilities.allComments);


}