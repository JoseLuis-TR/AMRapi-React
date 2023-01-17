/**
 * @file resultBox.jsx - Componente que muestra titulo y poster del producto
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[Unit]_ResultBox
 */

import React from 'react';
import { Link } from "react-router-dom";

/**
 * Componente que es renderizado en la página de resultados la cual muestra el nombre y el poster
 * de los contenidos que hayan sido filtrados por el buscador
 * 
 * @memberof module:Component[Unit]_ResultBox
 * @param {number} key Número que ayuda a identificar a Rect cada componente 
 * @param {string} id String del id de cada producto
 * @param {string} statusM Indica si se publica o ya ha finalizado el producto
 * @param {string} imagen Link a la imagen del poster del producto
 * @param {string} titulo Titulo del producto
 * @returns {JSX.Element} Contenido HTML referente al elemento que muestra poster y titulo de los productos encontrados por la api
 */
function ResultBox({key, id, statusM, imagen, titulo}) {
  return (
    <section key={key} className="resultados__caja">
        <Link 
            to="/product"
            state={{id:id, type:statusM}}>
            <img className="resultados__caja--imagen" src={imagen} alt={`Poster de ${titulo}`}/>
            <footer className="resultados__caja--cuadroTexto">
                <p className="resultados__caja--nombreSerie">{titulo}</p>
            </footer>
        </Link>
    </section>
  );
}

export default ResultBox;