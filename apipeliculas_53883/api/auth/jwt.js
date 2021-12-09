const jwt = require('jsonwebtoken');
require('dotenv').config();


function crearToken(usuario){
    /*
    valores del Token:
        id,
        nombre,
        roles.
    */
   const payload = {
     "id": usuario._id,
     "nombre": usuario.nombre,
     "roles": usuario.roles
   }

   // ENCRIPCION DE UNOS DATOS + EL TIEMPO DE EXPIRACIÓN
        // -> LOS DATOS DEL USUARIO.
        // -> 1 M -> 1 MUNUTO

   const token = jwt.sign(payload, process.env.JWT_CLAVE, {expiresIn: process.env.JWT_EXPIRE});
   return token;
}

/* Funcion de Midleware -> Antes de la accion final..
        -> Captura la peticion y validar
        1. si exite el token.
        2. Sí el token es válido.
*/
//nex -> si se activa el se elimina
// token Cabecera de la peticion 
function validarToken(request, reponse, next){
    let token = undefined;

    if(request.headers['authorization']){
        token = request.headers['authorization'].split(" ").pop();

    }

    if(token){
        jwt.verify(token, process.env.JWT_CLAVE, function(error, datos){ 
              // forma de resolver promesas llamadas CALBACK -> se usa con funciones verify
        if(error){
            reponse.status(401).send({"mensaje": "Token inválido"});

            }else{
                request.usuario = datos;
                next(); // pase a la ejecucion de la funcion eliminar pelicula
            }
        
        })

    } else{
    reponse.status(403).send({"mensaje": "Sin autorización"});

    }
}

module.exports.crearToken = crearToken;
module.exports.validarToken = validarToken;







