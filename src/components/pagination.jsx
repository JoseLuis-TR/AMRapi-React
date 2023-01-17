/**
 * @file pagination.jsx - Componente de paginación
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_Pagination
 */

/**
 * Componente usado para mostrar la paginación en la página de resultados de busqueda que nos sirve para mostrar
 * los elementos devueltos por la api de manera controlada
 * 
 * @memberof module:Component[Unit]_Pagination
 * @param {paginate} paginate Función usada para indicar el número actual en el que se encuentra la paginación
 * @param {number} postPerPage Indica el número de productos mostrados en cada página
 * @param {number} totalPosts Nos ayuda a calcular la cantidad máxima de páginas que tendra nuestra paginación
 * @returns {JSX.Element} Contenido HTML referente al paginado inferior de la página de busqueda
 */
function Pagination({postPerPage, totalPosts, paginate}){
    /**
     * No se que es
     * @type {Array}
     */
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav className="contenedorPagination">
            <ul className="pagination-group">
                {
                    pageNumbers.map(number => (
                        <li key={number} className="pagination-item">
                            <a onClick={() => paginate(number)} className="pagination-item-link">
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination;