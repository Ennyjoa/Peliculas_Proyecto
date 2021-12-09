// importamos la conexion con la DB

const basedatos = require('../../database/connection');

async function crearUno(nuevoUsuario){
    let db = basedatos.obtenerConexion();

    return await db.collection("usuarios").insertOne(nuevoUsuario);
    // operación de inserción

}

async function buscarPorUsuario(usuario){
    let db = basedatos.obtenerConexion();

    return await db.collection("usuarios").findOne({"usuario":usuario})

}

module.exports.crearUno = crearUno;
module.exports.buscarPorUsuario = buscarPorUsuario;