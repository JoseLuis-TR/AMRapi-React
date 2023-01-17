/**
 * @file botonRedSocial.jsx - Componente botón de red social
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_BotonRedSocial
 */

/**
 * Componente que es llamado para crear los botones de redes sociales usados en el login y el registro
 * 
 * @memberof module:Component[Unit]_BotonRedSocial
 * @param {string} name Nombre de la red social que será mostrada en el botón
 * @returns {JSX.Element} Contenido HTML referente a los botones de redes sociales de los formularios de login y registro
 */
function RrssButton({name}) {
    return(
        <div className="contenedorGenerico__redesSociales--boton">
            <img src={require(`../assets/images/${name}.png`)} alt={`Logo de ${name}`} className="contenedorGenerico__redesSociales--boton--logo"/>
            <p className="contenedorGenerico__redesSociales--boton--texto">Continuar con {name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
    )
}
  export default RrssButton;