/**
 * @file index.jsx - Inicio
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_Index
 */

import React, {useRef} from "react";
import Header from '../layout/header';
import Dropdown from "../dropdown";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

/**
 * Componente que se encarga de renderizar el index de la página web encargada de dar la bienvenida y de ser la puerta de entrada a poder
 * utilizar el buscador.
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>handleForm</b>
 * 
 * @memberof module:Component[View]_Index
 * @returns {JSX.Element} Contenido HTML referente a la página de inicio del proyecto
 */
function Index() {
    // Pertenece a una libreria que nos ayuda a eliminar acentos
    let accents = require('remove-accents');
    // Hook que nos ayudará a manejar los datos del formulario
    const formRef = useRef();
    // Hook que nos ayudará a enviar los datos del formulario a la página de resultados
    const navigate = useNavigate();
    
    // Las siguientes variables contienen los datos referentes a los name y value de los desplegables que se crean más abajo
    // Se reune todo en una lista conjunta para una mayor facilidad a la hora de iterar
    const opcionesGenero = {action: 'Acción', adventure:'Aventura', comedy:'Comedia', drama:'Drama', fantasy:'Fantasia'};
    const opcionesDecada = {2020:'2020s', 2010:'2010s', 2000:'2000s', 1990:'90s', 1980:'80s', 1970:'70s'};
    const opcionesMedia = {100: 'Sin límite', 90:'90% o menos', 80:'80% o menos', 70:'70% o menos', 60:'60% o menos', 50:'50% o menos', 40:'40% o menos'};
    const opcionesEstado = {releasing:'En publicación', finished:'Finalizado'};
    const opcionesTipo = {anime:'Anime', manga:'Manga'}
    const listaOpciones = {"Género":opcionesGenero, "Década":opcionesDecada, "Nota Media":opcionesMedia, "Estado":opcionesEstado, "Tipo":opcionesTipo}

    /**
     * @description Función llamada al realizar submit en el formulario, recibe el evento y 
     * de ese recoge los datos de los desplegables y los manda a la página de listado
     * @name handleForm
     * @function 
     * @param {event} event El evento que recoge la información del formulario
     */
    const handleForm = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData)
        navigate('/results',{state:values});
    }
    
    return (
        <>
            <Helmet>
                <title>AMR - Inicio</title>
            </Helmet>
            <Header 
                titulo="¿Que deseas descubrir hoy?"
            />
            <main className="contenedorCentro">
            <article className="centro">
                <h2 className="centro__frase">Descubre tu nuevo anime o manga favorito gracias a AMR.</h2>
                <form className="centro__busqueda busqueda__inicio" onSubmit={handleForm} ref={formRef}>
                    <section className="dropdowns">
                        {
                            // Recorre el objeto con objetos de las opciones para crear los desplegables
                            Object.entries(listaOpciones).map((value,key) => 
                                <Dropdown
                                    key = {key} 
                                    info={accents.remove(value[0].trim().toLowerCase().split(" ").join(""))}
                                    label={value[0]}
                                    opciones = {value[1]}
                                />
                                )
                        }
                    </section>
                    <section className="button">
                        <button onClick={handleForm} className="centro__inputBusqueda">Buscar</button>
                    </section>
                </form>
            </article>
        </main>
        </>
    )
}
export default Index;