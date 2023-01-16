import React, {useEffect, useState, useRef} from "react";
import Header from './header';
import ResultBox from "./resultBox";
import { Helmet } from "react-helmet";

function SavedList() {
    const [dataReceived, setDataReceived] = useState([]);
    const [isLoaded, setLoaded] = useState(false);

    async function fetchData(idList){
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

        let variables = {
            page: 1,
            perPage: 10,
            idList: idList
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

        console.log(options)

        await fetch(url, options).then(handleResponse)
                        .then(handleData)
                        .catch(handleError);
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
            setDataReceived(resultados)
            console.log(dataReceived);
        })
    }

    function handleError(error) {
        setDataReceived(undefined)
        console.error(error);
    }

    useEffect(() =>{
        console.log(localStorage.getItem("mediaSaved") === "")
        if(localStorage.getItem("mediaSaved") === "" || localStorage.getItem("mediaSaved") === null){
            console.log("noLS")
            setDataReceived([]);
        } else {
            console.log("lista existe")
            let savedList = localStorage.getItem("mediaSaved").split(",");
            console.log(savedList)
            fetchData(savedList)
        }
    }, []);

    useEffect(() => {
        setLoaded(true);
        console.log(dataReceived.length)
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
                        <article className="apiFailed">
                            <p>Si no tienes nada guardado...<br></br>¡No tienes nada que ver aquí!</p>
                            <img src={require("../assets/images/saved.gif")}></img>
                        </article>
                    }
                </article>
            </main>
            </>
        )
    }
}
export default SavedList;