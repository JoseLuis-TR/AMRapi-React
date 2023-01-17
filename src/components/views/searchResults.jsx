import React, {useEffect, useState, useRef} from "react";
import Pagination from "../pagination";
import Header from '../layout/header';
import Dropdown from "../dropdown";
import ResultBox from "../resultBox";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";


function Results() {
    let accents = require('remove-accents');
    let indexOfFirstPost = 0;
    let indexOfLastPost = 0;
    let currentPosts = [];
    const formRef = useRef();
    const state = useLocation();
    const valuesIndex = state["state"];
    const opcionesGenero = {action: 'Acción', adventure:'Aventura', comedy:'Comedia', drama:'Drama', fantasy:'Fantasia'};
    const opcionesDecada = {2020:'2020s', 2010:'2010s', 2000:'2000s', 1990:'90s', 1980:'80s', 1970:'70s'};
    const opcionesMedia = {100: 'Sin límite', 90:'90% o menos', 80:'80% o menos', 70:'70% o menos', 60:'60% o menos', 50:'50% o menos', 40:'40% o menos'};
    const opcionesEstado = {releasing:'En publicación', finished:'Finalizado'};
    const opcionesTipo = {anime:'Anime', manga:'Manga'};
    const listaOpciones = {"Género":opcionesGenero, "Década":opcionesDecada, "Nota Media":opcionesMedia, "Estado":opcionesEstado, "Tipo":opcionesTipo};
    const [dataReceived, setDataReceived] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(6);


    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const valuesSearch = Object.fromEntries(formData)
        let optionsToStorage = `${valuesSearch["genero"]},${valuesSearch["decada"]}, ${valuesSearch["notamedia"]},${valuesSearch["estado"]},${valuesSearch["tipo"]}`;
        optionsToStorage.replace(/\\/g, '')
        localStorage.setItem("searchResult",`${valuesSearch["genero"]},${valuesSearch["decada"]}, ${valuesSearch["notamedia"]},${valuesSearch["estado"]},${valuesSearch["tipo"]}`)
        fetchData(valuesSearch["genero"],valuesSearch["decada"],valuesSearch["notamedia"],valuesSearch["estado"],valuesSearch["tipo"])
    }

    async function fetchData(genre, decade, avgScore, status, type){
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

        await fetch(url, options).then(handleResponse)
                        .then(handleData)
                        .catch(handleError);
    }

    function handleResponse(response) {
        return response.json().then(async function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

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

    function handleError(error) {
        setDataReceived(undefined)
        console.error(error);
    }

    useEffect(() =>{
        fetchData(valuesIndex["genero"],valuesIndex["decada"], valuesIndex["notamedia"],valuesIndex["estado"],valuesIndex["tipo"]);
    }, [valuesIndex]);
    
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
                dataReceived ?
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
                :
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