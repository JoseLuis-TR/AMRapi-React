/**
 * @file productDetails.jsx - Listado en detalle de producto
 * @author José Luis Tocino Rojo
 */

/**
 * @module Component[View]_ProductDetails
 */

import React, { useState, useEffect} from "react";
import Header from '../layout/header';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Smiley from "../smiley";
import Status from "../status";
import Genres from "../genres";

/**
 * Componente que se encarga de mostrar en detalle un producto
 * <br>
 * <br>
 * <b><u>FUNCIONES INTERNAS</u></b>
 * <br>
 * - <b>prepareQuery</b>
 * - <b>handleResponse</b>
 * - <b>handleData</b>
 * - <b>handleError</b>
 * - <b>handleSaveCheck</b>
 * 
 * @memberof module:Component[View]_ProductDetails
 * @returns {JSX.Element} Contenido HTML referente a la página de listado de guardados
 */
function ProductDetails() {
    // Variable que usaremos para recibir los datos que reciba el componente a ser redirigido 
    const location = useLocation();
    // Cuando esocgemos un producto y se nos redirige aquí, recibimos el id con el que haremos la llamada
    // a la api
    const PRODUCT_ID = location.state["id"];
    // Estado y setters de las variables que:
    //  - Reciben los datos de la api
    //  - Comprueben que el producto esta guardado o no
    //  - Controlamos la carga del componente hasta que recibamos los datos
    const [apiData, setApiData] = useState({});
    const [isChecked, setCheck] = useState(localStorage.getItem("mediaSaved") === null ? false : localStorage.getItem("mediaSaved").split(",").includes(PRODUCT_ID.toString()));
    const [isLoaded, setLoaded] = useState(false);

    /**
     * @description Función que recibe el id del producto que quiere ser visto y prepara la url y opciones
     * necesarias para hacer la llamada a la API
     * @name prepareQuery
     * @function 
     * @param {string} id Id del producto que queremos ver
     * @returns {Array.<string,Object>} Array con la url y las opciones que contienen la query
     */
    function prepareQuery(id){
        // Quere que debe generase para la petición de la API
        let query = `
        query ($id:Int,$page: Int, $perPage: Int) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id:$id) {
                    id
                    type
                    coverImage{
                        extraLarge
                    }
                    title {
                        romaji
                    }
                    startDate {
                        year
                    }
                    episodes
                    chapters
                    description
                    averageScore
                    meanScore
                    genres
                    status
                }
            }
        }
        `;

        // Variables que nos ayuda a añadir los elementos de busqueda que necesitemos en la query
        let variables = {
            page: 1,
            perPage: 10,
            id: id,
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

        return [url, options]
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
            resultados = values.Page.media[0];
        })
        setApiData(resultados)
    }
    
    /**
     * @description Función que es llamada en caso de ocurrir algún error durante la comunicación con la API
     * y nos ayuda a entender cual ha sido el problema
     * @name handleError
     * @function 
     * @param {Object} error Mensaje de error
     */
    function handleError(error) {
        setApiData(undefined);
        console.log(error)
    }

    /**
     * @description Función que se activa al hacer click en el checkbox y nos ayuda a guardar el id del producto
     * en una lista en el localStorage
     * @name handleSaveCheck
     * @function 
     */
    function handleSaveCheck(){
        let mediaList = [];
        // Comprobamos si existe ya un objeto con key mediaSaved en localStorage
        if(localStorage.getItem("mediaSaved")){
            mediaList = localStorage.getItem("mediaSaved").split(",")
            // Si ya tenemos este producto guardado, lo eliminamos de la lista y guardamos mediaSaved
            if(mediaList.includes(PRODUCT_ID.toString())){
                let index = mediaList.indexOf(PRODUCT_ID.toString());
                mediaList.splice(index,1)
                setCheck(false);
                localStorage.setItem("mediaSaved", mediaList)
            // En caso de no tener el producto guardado, lo añadimos a la lista y guardamos
            } else {
                mediaList.push(PRODUCT_ID)
                setCheck(true);
                localStorage.setItem("mediaSaved", mediaList)
            }
        // En caso de no existir mediaSaved en localStorage, se añade el id de producto en una lista y se crea mediaSaved
        } else {
            mediaList.push(PRODUCT_ID)
            localStorage.setItem("mediaSaved", mediaList)
        }
    }
    
    // cuando se carga la página se crea la query y se realiza la llamada a la API
    useEffect(() => {
        let query = prepareQuery(PRODUCT_ID);

        /**
         * @description Función asincrona con la que hacemos la llamada a la api
         * @name fetchData
         * @async
         * @function 
         */
        const fetchData = async () => {
            await fetch(query[0], query[1]).then(handleResponse)
                                            .then(handleData)
                                            .catch(handleError);
        }
        fetchData();
    }, [])

    // CUando recibimos los datos de la api, revisamos si el producto esta guardado ya en localStorage
    // en caso positivo mostraremos el check con un tick, en caso negativo se activa la carga
    useEffect(() => {
        console.log(apiData["status"])
        if(localStorage.getItem("mediaSaved") !== null){
            let mediaList = localStorage.getItem("mediaSaved").split(",");
            if(mediaList.includes(PRODUCT_ID)){
                setCheck(!isChecked);
            }
        } else {
            setLoaded(true);
        }
    }, [apiData])

    // Nos aseguramos de cargar el componente en caso de existir en la lista de localStorage
    useEffect(() => {
        setLoaded(true);
    }, [isChecked])

    if(Object.keys(apiData).length > 0 && isLoaded){
        return (
            <>
                <Helmet>
                    <title>{`AMR - ${apiData["title"]["romaji"]}`}</title>
                </Helmet>
                <Header 
                    titulo={""}
                />
                <main className="contenedorCentro">
                    <article className="contenedorSerie">
                        <section className="contenedorSerie__poster">
                            {
                                <img src={apiData["coverImage"]["extraLarge"]} alt="Poster de la serie [Nombre]" className="contenedorSerie__poster--imagen"/>
                            }
                        </section>
                        <section className="contenedorSerie__info">
                            <h2 className="contenedorSerie__info--titulo">{apiData["title"]["romaji"]}</h2>
                            <div className="contenedorSerie__info--basico">
                                <p className="contenedorSerie__info--basico--texto">{apiData["startDate"]["year"]}</p>
                                <Status 
                                    statusM={apiData["status"]}
                                    episodes={apiData["episodes"]+apiData["chapters"]}
                                />
                            </div>
                        </section>
                        <section className="contenedorSerie__sinopsis">
                            <p className="contenedorSerie__sinopsis--texto">
                                {apiData["description"] !== null ? apiData["description"].split("<br>").join("\n") : "No description"}
                            </p>
                        </section>
                        <section className="contenedorSerie__extra">
                            <div className="contenedorSerie__extra--nota">
                                <Smiley 
                                    nota={apiData["averageScore"]}
                                />
                                <p className="contenedorSerie__extra--nota--texto">{apiData["averageScore"] !== null ? apiData["averageScore"] : "N/A"}%</p>
                            </div>
                            <a target="_blank" rel="noopener noreferrer" className="contenedorSerie__extra--linkAnilist" href={`https://anilist.com/${apiData["type"]}/${apiData["id"]}/${apiData["title"]["romaji"].replace(" ","-")}/`}>
                                <img src={require("../../assets/images/anilist.png")} alt="Logo de Anilist" className="contenedorSerie__extra--linkAnilist--imagen"/>
                                <p className="contenedorSerie__extra--linkAnilist--texto">Ver + info</p>
                            </a>
                        </section>
                        <footer className="contenedorSerie__footer">
                            <Genres 
                                genres={apiData["genres"]}
                            />
                            <section className="contenedorSerie__footer--checkbox">
                                <input id="check-prod" type="checkbox" className="contenedorSerie__footer--checkbox--check" onChange={handleSaveCheck} defaultChecked={isChecked}/>
                                <label for="check-prod" className="contenedorSerie__footer--checkbox--label"></label>
                            </section>
                        </footer>
                    </article>
                </main>
            </>
        )
    }
}
export default ProductDetails;