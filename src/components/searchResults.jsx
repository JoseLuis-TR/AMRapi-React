import React, {useEffect, useRef, useState} from "react";
import Header from './header';
import Dropdown from "./dropdown";
import ResultBox from "./resultBox";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Results() {
    let accents = require('remove-accents');
    const state = useLocation();
    const values = state["state"];
    const opcionesGenero = {action: 'Acción', adventure:'Aventura', comedy:'Comedia', drama:'Drama', fantasy:'Fantasia'};
    const opcionesDecada = {2020:'2020s', 2010:'2010s', 2000:'2000s', 1990:'90s', 1980:'80s', 1970:'70s'};
    const opcionesMedia = {90:'90% o más', 80:'80% o más', 70:'70% o más', 60:'60% o más', 50:'50% o más', 40:'40% o más'};
    const opcionesEstado = {releasing:'En publicación', finished:'Finalizado'};
    const opcionesTipo = {anime:'Anime', manga:'Manga'};
    const listaOpciones = {"Género":opcionesGenero, "Década":opcionesDecada, "Nota Media":opcionesMedia, "Estado":opcionesEstado, "Tipo":opcionesTipo};
    const [genre, setGenre] = useState(values["genero"]);
    const [age, setAge] = useState(values["decada"]);
    const [avgScore, setAvgScore] = useState(values["notamedia"]);
    const [status, setStatus] = useState(values["estado"]);
    const [type, setType] = useState(values["tipo"]);
    const [dataReceived, setDataReceived] = useState([]);

    function handleSearch(e){
        e.preventDefault();
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
                media (isAdult: false, genre_in: [$genre], startDate_greater:$ageless, startDate_lesser:$agemore, averageScore_greater: $score, status:$status, type:$type, sort:SCORE_DESC, countryOfOrigin:JP) {
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
        let decadeMore = decade+10;
        let variables = {
            page: 1,
            perPage: 30,
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
        fetchData(genre, age, avgScore, status, type);
    }, []);

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
                <form className="centro__busqueda busqueda__inicio">
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
                        <button  className="centro__inputBusqueda" onClick={fetchData}>Buscar</button>
                    </section>
                </form>
            </article>
            <article class="resultados">
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
        </main>
        </>
    )
}
export default Results;