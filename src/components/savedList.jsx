import React, {useEffect, useState, useRef} from "react";
import Header from './header';
import Dropdown from "./dropdown";
import ResultBox from "./resultBox";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function SavedList() {
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
    const savedData = localStorage.getItem("mediaSaved").split(",");
    const savedProducts = [];
    const [dataReceived, setDataReceived] = useState([]);
    const [genre, setGenre] = useState("");
    const [age, setAge] = useState("");
    const [avgScore, setAvgScore] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");

    async function prepareQuery(id){
        let query = `
        query ($page: Int, $perPage: Int, $id: Int) {
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id: $id) {
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
            perPage: 10,
            id: id
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

        return [url,options];
    }

    function handleResponse(response) {
        console.log(response)
        return response.json().then(function (json) {
            console.log(json);
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data);
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

    async function printFavs(){
        for(let i=0; i < savedData.length; i++){
            console.log(savedData[i]);
            let query = prepareQuery(savedData[i]);
            const fetchData = async () => {
                await fetch(query[0], query[1]).then(handleResponse)
                                                .then(handleData)
                                                .catch(handleError);
            }
            fetchData();
            console.log(dataReceived);
        }
    }

    useEffect(() =>{
        for(let i=0; i < savedData.length; i++){
            console.log(savedData[i]);
            let query = prepareQuery(savedData[i]);
            console.log(query);
            const fetchData = async () => {
                await fetch(query[0], query[1]).then(handleResponse)
                                                .then(handleData)
                                                .catch(handleError);
            }
            fetchData();
            console.log(dataReceived);
        }
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
                <form className="centro__busqueda busqueda__inicio" ref={formRef}>
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
                        <button  className="centro__inputBusqueda" >Buscar</button>
                    </section>
                </form>
            </article>
            {
                dataReceived ?
                <article class="resultados">
                <p>D:</p>
                </article>
                :
                <p>:D</p>
            }
        </main>
        </>
    )
}
export default SavedList;