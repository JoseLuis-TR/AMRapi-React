/**
 * @file searchResults.jsx - Resultados de busqueda
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_SearchResults
 */

import React, {useEffect, useState, useRef} from "react";
import Pagination from "../pagination";
import Header from '../layout/header';
import Dropdown from "../dropdown";
import ResultBox from "../resultBox";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

/**
 * Componente que se encarga de renderizar los resultados de las busquedas que se hagan en la web
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>handleSearch</b>
 * - <b>fetchData</b>
 * - <b>handleResponse</b>
 * - <b>handleData</b>
 * - <b>handleError</b>
 * - <b>paginate</b>
 * 
 * @memberof module:Component[View]_SearchResults
 * @returns {JSX.Element} Contenido HTML referente a la página de listado de guardados
 */
function Results() {
    // Pertenece a una libreria que nos ayuda a eliminar acentos
    let accents = require('remove-accents');
    // Variables necesarias para crear la paginación de los resultados
    let indexOfFirstPost = 0;
    let indexOfLastPost = 0;
    let currentPosts = [];
    // Hook que nos ayuda a manejar los datos del formulario de busqueda
    const formRef = useRef();
    // Hook que nos ayuda a recibir los datos del formulario de busqueda de la página de inicio
    const state = useLocation();
    // Variable que recibe los datos de la busqueda de la página de inicio
    const valuesIndex = state["state"];
    // Las siguientes variables contienen los datos referentes a los name y value de los desplegables que se crean más abajo
    // Se reune todo en una lista conjunta para una mayor facilidad a la hora de iterar
    const opcionesGenero = {action: 'Acción', adventure:'Aventura', comedy:'Comedia', drama:'Drama', fantasy:'Fantasia'};
    const opcionesDecada = {2020:'2020s', 2010:'2010s', 2000:'2000s', 1990:'90s', 1980:'80s', 1970:'70s'};
    const opcionesMedia = {100: 'Sin límite', 90:'90% o menos', 80:'80% o menos', 70:'70% o menos', 60:'60% o menos', 50:'50% o menos', 40:'40% o menos'};
    const opcionesEstado = {releasing:'En publicación', finished:'Finalizado'};
    const opcionesTipo = {anime:'Anime', manga:'Manga'};
    const listaOpciones = {"Género":opcionesGenero, "Década":opcionesDecada, "Nota Media":opcionesMedia, "Estado":opcionesEstado, "Tipo":opcionesTipo};
    // EStado y setter de los datos recibidos de las peticiones realizadas en la propia pag. de busqueda
    const [dataReceived, setDataReceived] = useState([]);
    // Estados y setter usados para indicar la página en la que nos encontramos en la paginación además
    // de indicar cuantos post deben de mostrarse por página
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(9);

    /**
     * @description Función que es llamada cuando realizamos la busqueda en la propia página de busqueda, recoge los datos y
     * realiza la llamada a la API
     * @name handleSearch
     * @function
     * @param {event} event Evento con todos los datos del formulario de busqueda
     */
    const handleSearch = (event) => {
        event.preventDefault();
        // Se recogen los datos y se añaden a una variable de facil acceso
        const formData = new FormData(formRef.current);
        const valuesSearch = Object.fromEntries(formData)
        // Se realiza la llamada de los datos
        fetchData(valuesSearch["genero"],valuesSearch["decada"],valuesSearch["notamedia"],valuesSearch["estado"],valuesSearch["tipo"])
    }

    /**
     * @description Función que es llamada para controlar la recolección de los datos de la api, la cual
     * crea la query, opciones y url para luego hacer las pertinentes llamadas a la api y funciones necesaria
     * para formatear la respuesta
     * @name fetchData
     * @async
     * @function 
     * @param {string} genre Filtro del genero por el que queremos buscar
     * @param {string} decade Filtro de la decada por el que queremos buscar
     * @param {string} avgScore Filtro de la nota media por el que queremos buscar
     * @param {string} status Filtro del estado de publicación por el que queremos buscar
     * @param {string} type Filtro del tipo de producto por el que queremos buscar
     */
    async function fetchData(genre, decade, avgScore, status, type){
        // Query que debe generarse para la petición a la API
        let query = `
        query ($page: Int, $perPage: Int, $genre: String, $ageless: FuzzyDateInt, $agemore: FuzzyDateInt, $score: Int, $status: MediaStatus, $type: MediaType) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (isAdult: false, genre_in: [$genre], startDate_greater:$ageless, startDate_lesser:$agemore, averageScore_lesser: $score, status:$status, type:$type, sort:SCORE_DESC, countryOfOrigin:JP) {
                    id
                    coverImage{
                        extraLarge
                    }
                    title {
                        romaji
                    }
                    status
                }
            }
        }
        `;

        // Variables que nos ayuda a añadir los elementos de busqueda que necesitemos en la query
        let variables = {
            page : 1,
            perPage: 100,
            genre: genre,
            ageless: `${decade}0000`,
            agemore: `${parseInt(decade)+10}0000`,
            score: avgScore,
            status: status.toUpperCase(),
            type: type.toUpperCase(),
        };

        // url de la api junto a las opciones de petición a la que se le añade variables y query
        let url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        // Se realiza la llamada y se procesa la respuesta
        await fetch(url, options).then(handleResponse)
                        .then(handleData)
                        .catch(handleError);
    }

    /**
     * @description Función que es llamada tras realizar la petición a la API y se encarga de procesar
     * la respuesta que recibamos
     * @name handleResponse
     * @function 
     * @param {Object} response Respuesta de la api con la información deseada
     */
    function handleResponse(response) {
        return response.json().then(async function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    /**
     * @description Función que es llamada tras procesar la respuesta de la API y nos ayuda a extraer la
     * información que necesitamos para nuestra aplicación
     * @name handleData
     * @function 
     * @param {Object} data Respuesta procesada de la API
     */
    function handleData(data) {
        let resultados
        Object.entries(data).forEach(([label,values])=>{
            resultados = values.Page.media;
            if(resultados.length !== 0){
                setDataReceived(resultados)
            } else {
                setDataReceived(undefined)
            }
        })
    }

    /**
     * @description Función que es llamada en caso de ocurrir algún error durante la comunicación con la API
     * y nos ayuda a entender cual ha sido el problema
     * @name handleError
     * @function 
     * @param {Object} error Mensaje de error
     */
    function handleError(error) {
        setDataReceived(undefined)
        console.error(error);
    }

    // Se activa al setearse la variable que recibe los filtros de busqueda de la página de inicio
    useEffect(() =>{
        fetchData(valuesIndex["genero"],valuesIndex["decada"], valuesIndex["notamedia"],valuesIndex["estado"],valuesIndex["tipo"]);
    }, [valuesIndex]);
    
    // Si se reciben datos se calcula de cuantas páginas consistira la paginación
    if(dataReceived){
        indexOfLastPost = currentPage * postPerPage;
        indexOfFirstPost = indexOfLastPost - postPerPage;
        currentPosts = dataReceived.slice(indexOfFirstPost, indexOfLastPost);
    }

    /**
     * @description Función de la que haremos uso cuando querramos indicar en que página de la paginación estamos
     * @name paginate
     * @function
     * @param {number} pageNumber Numero que indicara en que página queremos estar
     */
    function paginate(pageNumber){
        setCurrentPage(pageNumber)
    }

    return (
        <>
            <Helmet>
                <title>AMR - Resultados de busqueda</title>
            </Helmet>
            <Header 
                titulo="Busqueda"
            />
            <main className="contenedorCentro">
            <article className="centro">
                <form className="centro__busqueda busqueda__inicio" onSubmit={handleSearch} ref={formRef} >
                    <section className="dropdowns">
                        {
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
                        <button  className="centro__inputBusqueda" onClick={handleSearch}>Buscar</button>
                    </section>
                </form>
            </article>
            {
                dataReceived ? // En caso de recibir datos, se muestra la información
                <>
                    <article className="resultados">
                    {
                        Object.entries(currentPosts).map((value, key) =>
                            <ResultBox 
                                key = {key}
                                id = {value[1]["id"]}
                                titulo = {value[1]["title"]["romaji"]}
                                imagen = {value[1]["coverImage"]["extraLarge"]}
                                statusM = {value[1]["status"]}
                            />
                        )
                    }
                    </article>
                    <Pagination 
                            postPerPage={postPerPage}
                            totalPosts={dataReceived.length}
                            paginate={paginate}
                        />
                </>
                : // En caso de no encontrar datos,se muestra el mensaje pertinente
                <article className="apiFailed">
                    <p>¡Disculpa!<br></br>Lo que buscabas no pudo ser encontrado</p>
                    <img src={require("../../assets/images/search.gif")} alt="Personaje anime femenino con dudas"></img>
                </article>
            }
        </main>
        </>
    )
}
export default Results;