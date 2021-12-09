
const express = require('express'); //Configuramos Express
const controladorUsuarios = express.Router(); //Metodo Router: definimos rutas sin estar monitoreadas
// importamos los servicio de usuarios
const servicioUsuarios = require('./service');
const servicioPeliculas = require('../peliculas/service');

/*
    GET -> LOGIN
    POST -> OBTENER USUARIO
*/

controladorUsuarios.get("/iniciarSesion", async function(request, response){
    let datos = request.query;  // Ingresamos los datos por Query-> ?usuario=joa&contrasena=123
    let resultado = await servicioUsuarios.iniciarSesion(datos); // Query + seguro
    response.send(resultado);
});

/*
    nuevoUsuario = {
        "nombre": "XXXX"
        "usuario": "XXXX"
        "clave": "ZZZ" --> encriptar
        "roles": ["A", "B"]
    }
 */
/*
    Crear Usuario 
*/

//  1) Crear un nuevo Usuario
controladorUsuarios.post("/crearUsuario", async function(request, response){
    //capturamos los datos del usuario
    let nuevoUsuario = request.body;
    let resultado = await servicioUsuarios.crearUsuario(nuevoUsuario);
    response.send(resultado);
});




module.exports = controladorUsuarios;