import React from "react";


// clase que se va acomvertir en un componente
// --> extends : herencia
export default class ComponeteClase extends React.Component{
    /*
        Aquí va
            -> Constructor
            -> Atributos / Estados
            -> Métodos / Comportamientos
                -> render() -> Retorna código JXS.
    */
// render metodos que lleva nuestra clase
    render(){
        return(
            <>
                <h3>Componente de clase </h3>
                <span>Autor: Johanna Sanchez </span>
            </>

        );
    }


}

