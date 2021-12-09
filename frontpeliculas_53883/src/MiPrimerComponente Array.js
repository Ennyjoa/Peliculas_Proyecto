function MiPrimerComponenteArray(props){

    /* Array de Objetos

        props = {
            personas = [{}, {}, {}]
        }
       funcion de javaScript map -> permite iterar y devolver ese elemento modificado 
    */
      
    return (
        <>
            {/*Funcion flecha  =>*/}
            {props.personas.map(personas => (
                <>
                    <h3>Mi primer componente funcional</h3>
                    <span>{personas.nombre} {personas.apellido} {personas.edad}</span>
        

                </>
            ))}
    
        </>
    );
}


export default MiPrimerComponenteArray;