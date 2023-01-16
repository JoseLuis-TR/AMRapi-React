import React, {useEffect, useState, useRef} from "react";
import Header from './header';
import Dropdown from "./dropdown";
import ResultBox from "./resultBox";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { RotatingLines } from  'react-loader-spinner'

function Results() {
    let accents = require('remove-accents');
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
    const [genre, setGenre] = useState("");
    const [age, setAge] = useState("");
    const [avgScore, setAvgScore] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const valuesSearch = Object.fromEntries(formData)
        let optionsToStorage = `${valuesSearch["genero"]},${valuesSearch["decada"]}, ${valuesSearch["notamedia"]},${valuesSearch["estado"]},${valuesSearch["tipo"]}`;
        optionsToStorage.replace(/\\/g, '')
        localStorage.setItem("searchResult",`${valuesSearch["genero"]},${valuesSearch["decada"]}, ${valuesSearch["notamedia"]},${valuesSearch["estado"]},${valuesSearch["tipo"]}`)
        console.log(valuesSearch["genero"]);
        fetchData(valuesSearch["genero"],valuesSearch["decada"],valuesSearch["notamedia"],valuesSearch["estado"],valuesSearch["tipo"])
    }

    async function fetchData(genre, decade, avgScore, status, type){
        let query = `
        query ($page: Int, $perPage: Int, $genre: String, $ageless: FuzzyDateInt, $agemore: FuzzyDateInt, $score: Int, $status: MediaStatus, $type: MediaType) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
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
            page: 1,
            perPage: 100,
            genre: genre,
            ageless: `${decade}0000`,
            agemore: `${parseInt(decade)+10}0000`,
            score: avgScore,
            status: status.toUpperCase(),
            type: type.toUpperCase(),
        };

        console.log(variables)

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
            console.log(dataReceived);
        })
    }

    function handleError(error) {
        setDataReceived(undefined)
        console.error(error);
    }

    useEffect(() =>{
        fetchData(valuesIndex["genero"],valuesIndex["decada"], valuesIndex["notamedia"],valuesIndex["estado"],valuesIndex["tipo"]);
    }, [valuesIndex]);

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
                <form className="centro__busqueda busqueda__inicio" onSubmit={handleSearch} ref={formRef}>
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
                <article className="resultados">
                {
                    Object.entries(dataReceived).map((value, key) =>
                        <ResultBox 
                            key = {key}
                            id = {value[1]["id"]}
                            titulo = {value[1]["title"]["romaji"]}
                            imagen = {value[1]["coverImage"]["extraLarge"]}
                            status = {value[1]["status"]}
                        />
                    )
                }
                </article>
                :
                <article className="apiFailed">
                    <p>¡Disculpa!<br></br>Lo que buscabas no pudo ser encontrado</p>
                    <img src={require("../assets/images/search.gif")}></img>
                </article>
            }
        </main>
        </>
    )
}
export default Results;