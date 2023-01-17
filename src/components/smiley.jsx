/**
 * @file smiley.jsx - Componente smiley de la pantalla de producto detallado
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_Smiley
 */

/**
 * Componente usado en la pantalla de producto detallado para renderizar según que imagen del smiley,
 * dependiendo de la nota media con la que cuente este producto
 * 
 * @memberof module:Component[Unit]_Smiley
 * @param {Object} props Objeto que contiene dentro la nota media del producto
 * @returns {JSX.Element} Contenido HTML referente a la nota media del producto mostrado en la vista detallada
 */
function Smiley(props) {
  // Contra mejor la nota, más feliz el smiley
  if(props.nota >= 0 && props.nota < 45){
    return(
        <img src={require("../assets/images/sad.png")} alt="Smiley" className="contenedorSerie__extra--nota--imagen"/>
    )
  } else if(props.nota >= 45 && props.nota < 75){
    return(
        <img src={require("../assets/images/neutral.png")} alt="Smiley" className="contenedorSerie__extra--nota--imagen"/>
    )
  } else if (props.nota >= 75 && props.nota <= 100){
    return(
        <img src={require("../assets/images/happy.png")} alt="Smile" className="contenedorSerie__extra--nota--imagen"/>
    )
  }
}

export default Smiley;