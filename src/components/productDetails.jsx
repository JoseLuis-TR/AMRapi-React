import React, {useRef, useState, useEffect} from "react";
import Header from './header';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Smiley from "./smiley";
import Status from "./status";
import Genres from "./genres";

function ProductDetails(props) {
    const location = useLocation();
    const PRODUCT_ID = location.state["id"];
    //window.localStorage.setItem('mediaSaved',"")
    const [apiData, setApiData] = useState({});
    const [isChecked, setCheck] = useState(false);
    console.log(isChecked)

    function prepareQuery(id){
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
                    genres
                    status
                }
            }
        }
        `;

        let variables = {
            page: 1,
            perPage: 10,
            id: id,
        };

        console.log(variables);

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

    function handleResponse(response) {
        console.log(response);
        return response.json().then(function (json) {
            console.log(json);
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        console.log(data);
        let resultados;
        Object.entries(data).forEach(([label,values])=>{
            resultados = values.Page.media[0];
            console.log(resultados)
        })
        setApiData(resultados);
    }

    function handleError(error) {
        setApiData(undefined)
        console.error(error);
    }

    useEffect(() => {
        let query = prepareQuery(PRODUCT_ID);
        const fetchData = async () => {
            await fetch(query[0], query[1]).then(handleResponse)
                                            .then(handleData)
                                            .catch(handleError);
        }
        fetchData();
        if(localStorage.getItem("mediaSaved") !== null){
            let mediaList = localStorage.getItem("mediaSaved").split(",");
            console.log(mediaList)
            if(mediaList.includes(PRODUCT_ID)){
                setCheck(!isChecked);
            }
        }
    }, [])

    function handleSaveCheck(){
        let mediaList = [];
        console.log(PRODUCT_ID)
        if(localStorage.getItem("mediaSaved")){
            mediaList = localStorage.getItem("mediaSaved").split(",")
            if(mediaList.includes(PRODUCT_ID.toString())){
                let index = mediaList.indexOf(PRODUCT_ID);
                mediaList.splice(index,1)
                setCheck(!isChecked);
                console.log(mediaList)
                localStorage.setItem("mediaSaved", mediaList)
            } else {
                mediaList.push(PRODUCT_ID)
                setCheck(!isChecked);
                console.log(mediaList)
                localStorage.setItem("mediaSaved", mediaList)
            }
            console.log(isChecked);
        } else {
            mediaList.push(PRODUCT_ID)
            console.log(mediaList)
            localStorage.setItem("mediaSaved", mediaList)
        }
    }

    if(Object.keys(apiData).length > 0){
        return (
            <>
                <Helmet>
                    <title>{`AMR - ${apiData["title"]["romaji"]}`}</title>
                </Helmet>
                <Header 
                    titulo={""}
                />
                <main class="contenedorCentro">
                    <article class="contenedorSerie">
                        <section class="contenedorSerie__poster">
                            {
                                <img src={apiData["coverImage"]["extraLarge"]} alt="Poster de la serie [Nombre]" class="contenedorSerie__poster--imagen"/>
                            }
                        </section>
                        <section class="contenedorSerie__info">
                            <h2 class="contenedorSerie__info--titulo">{apiData["title"]["romaji"]}</h2>
                            <div class="contenedorSerie__info--basico">
                                <p class="contenedorSerie__info--basico--texto">{apiData["startDate"]["year"]}</p>
                                <Status 
                                    status={apiData["status"]}
                                    episodes={apiData["episodes"]+apiData["chapters"]}
                                />
                            </div>
                        </section>
                        <section class="contenedorSerie__sinopsis">
                            <p class="contenedorSerie__sinopsis--texto">
                                {apiData["description"].split("<br>").join("\n")}
                            </p>
                        </section>
                        <section class="contenedorSerie__extra">
                            <div class="contenedorSerie__extra--nota">
                                <Smiley 
                                    nota={apiData["averageScore"]}
                                />
                                <p class="contenedorSerie__extra--nota--texto">{apiData["averageScore"]}%</p>
                            </div>
                            <a target="_blank" rel="noopener noreferrer" class="contenedorSerie__extra--linkAnilist" href={`https://anilist.com/${apiData["type"]}/${apiData["id"]}/${apiData["title"]["romaji"].replace(" ","-")}/`}>
                                <img src={require("../assets/images/anilist.png")} alt="Logo de Anilist" class="contenedorSerie__extra--linkAnilist--imagen"/>
                                <p class="contenedorSerie__extra--linkAnilist--texto">Ver + info</p>
                            </a>
                        </section>
                        <footer class="contenedorSerie__footer">
                            <Genres 
                                genres={apiData["genres"]}
                            />
                            <section class="contenedorSerie__footer--checkbox">
                                <input id="check-prod" type="checkbox" class="contenedorSerie__footer--checkbox--check" onChange={handleSaveCheck} defaultChecked={isChecked}/>
                                <label for="check-prod" class="contenedorSerie__footer--checkbox--label"></label>
                            </section>
                        </footer>
                    </article>
                </main>
            </>
        )
    }
}
export default ProductDetails;