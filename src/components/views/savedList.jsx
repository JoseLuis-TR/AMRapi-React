/**
 * @file savedList.jsx - Listado de guardados
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_SavedList
 */

import React, {useEffect, useState} from "react";
import Header from '../layout/header';
import ResultBox from "../resultBox";
import { Helmet } from "react-helmet";

/**
 * Componente que se encarga de renderizar la lista de productos guardados por el usuario
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>fetchData</b>
 * - <b>handleResponse</b>
 * - <b>handleData</b>
 * - <b>handleError</b>
 * 
 * @memberof module:Component[View]_SavedList
 * @returns {JSX.Element} Contenido HTML referente a la página de listado de guardados
 */
function SavedList() {
    // Estado y setter de los datos recibidos por la api
    const [dataReceived, setDataReceived] = useState([]);
    // Estado y setter de la variable que controla la carga de la página
    const [isLoaded, setLoaded] = useState(false);

    /**
     * @description Función que es llamada para controlar la recolección de los datos de la api, la cual
     * crea la query, opciones y url para luego hacer las pertinentes llamadas a la api y funciones necesaria
     * para formatear la respuesta
     * @name fetchData
     * @async
     * @function 
     * @param {Array.<string>} idList Lista de ids de las series guardadas por el usuario
     */
    async function fetchData(idList){
        // Query que debe generarse para la petición a la API
        let query = `
        query ($page: Int, $perPage: Int, $idList: [Int]) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id_in: $idList) {
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
            page: 1,
            perPage: 10,
            idList: idList
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
        return response.json().then(function (json) {
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
        let resultados;
        Object.entries(data).forEach(([label,values])=>{
            resultados = values.Page.media;
            setDataReceived(resultados);
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

    // Cuando se carga la página se revisa que haya en localStorage datos sobre los productos guardados
    useEffect(() =>{
        if(localStorage.getItem("mediaSaved") === "" || localStorage.getItem("mediaSaved") === null){
            setDataReceived([]);
        } else {
            let savedList = localStorage.getItem("mediaSaved").split(",");
            fetchData(savedList)
        }
    }, []);

    // Cuando se setea la variable de datos recibidos por la api, se deja cargar el return del componente
    useEffect(() => {
        setLoaded(true);
    }, [dataReceived])

    if(isLoaded){
        return (
            <>
                <Helmet>
                    <title>AMR - Tu lista de guardados</title>
                </Helmet>
                <Header 
                    titulo="Tu lista de guardados"
                />
                <main className="contenedorCentro">
                    <article className="resultados">
                        {
                            // En caso de haber recubido datos se muestran
                            dataReceived.length > 0 ?
                            Object.entries(dataReceived).map((value, key) =>
                                <ResultBox 
                                    key = {key}
                                    id = {value[1]["id"]}
                                    titulo = {value[1]["title"]["romaji"]}
                                    imagen = {value[1]["coverImage"]["extraLarge"]}
                                    status = {value[1]["status"]}
                                />
                            )
                            :
                            // En caso de no recibir nada se muestra un mensaje
                            <article className="apiFailed">
                                <p>Si no tienes nada guardado...<br></br>¡No tienes nada que ver aquí!</p>
                                <img src={require("../../assets/images/saved.gif")} alt="Personaje anime femenino dando golpes"></img>
                            </article>
                        }
                    </article>
                </main>
            </>
        )
    }
}
export default SavedList;