/**
 * @file status.jsx - Componente de status de la pantalla de producto detallado
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_Status
 */

/**
 * Componente usado para mostrar el estado de publicación actual en el que es encuentra
 * el producto en la pantalla de info detallada
 * 
 * @memberof module:Component[Unit]_Status
 * @param {string} statusM Indica si se esta publicando o ha acabado
 * @param {number} episodes El número total de episodios con el que cuenta
 * @returns {JSX.Element} Contenido HTML referente al estado de publicación del producto mostrado en la vista detallada
 */
function Status({statusM, episodes}) {
    if(statusM === "FINISHED"){
        return(
            <p className="contenedorSerie__info--basico--texto">{episodes} episodios</p>
        )
    } else if(statusM === "RELEASING"){
        return(
            <p className="contenedorSerie__info--basico--texto">En publicación</p>
        )
    }
}
  export default Status;