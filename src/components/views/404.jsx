/**
 * @file 404.jsx - Componente error página no encontrada
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_404
 */

import React from 'react';
import Header from '../layout/header';
import { Helmet } from "react-helmet";

/**
 * Componente encargado de renderizar la página que se muestra al no encontrar la página que se estaba buscando
 * 
 * @memberof module:Component[View]_404
 * @returns {JSX.Element} Devuelve el contenido de la página de Error 404
 */
function Error404() {
  return (
    <>
        <Helmet>
            <title>AMR - 404</title>
        </Helmet>
        <Header 
            titulo="ERROR - 404"
        />
        <main className="contenedorError">
            <img className="contenedorError__gif1"  src={require("../../assets/images/walking.gif")} alt="Personaje andando"/>
            <img className="contenedorError__gif2"  src={require("../../assets/images/running.gif")} alt="Personaje corriendo"/>
            <article className="contenedorError__mensaje">
                <h2 className="contenedorError__mensaje--titulo">Página no encontrada</h2>
                <section className="contenedorError__mensaje--descripcion">
                    <p>Tenemos a nuestras mejores investigadoras buscando eso que quieres pero ni ellas pueden encontrarlo.</p>
                    <p>Si es un contenido que consideras que deba estar en nuestra página, mandanos un mensaje en nuestra sección de <a href="contacto.html">contacto</a>.</p>
                </section>
            </article>
        </main>
    </>
  );
}

export default Error404;