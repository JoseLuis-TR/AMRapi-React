import React, { useState, useEffect} from "react";
import Header from './header';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Smiley from "./smiley";
import Status from "./status";
import Genres from "./genres";

function ProductDetails() {
    const location = useLocation();
    const PRODUCT_ID = location.state["id"];
    const [apiData, setApiData] = useState({});
    const [isChecked, setCheck] = useState(localStorage.getItem("mediaSaved") === null ? false : localStorage.getItem("mediaSaved").split(",").includes(PRODUCT_ID.toString()));
    const [isLoaded, setLoaded] = useState(false);

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
                    meanScore
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
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }
    
    function handleData(data) {
        let resultados;
        Object.entries(data).forEach(([label,values])=>{
            resultados = values.Page.media[0];
        })
        setApiData(resultados)
    }
    
    function handleError(error) {
        setApiData(undefined);
    }
    
    useEffect(() => {
        let query = prepareQuery(PRODUCT_ID);
        const fetchData = async () => {
            await fetch(query[0], query[1]).then(handleResponse)
                                            .then(handleData)
                                            .catch(handleError);
        }
        fetchData();
    }, [])

    function handleSaveCheck(){
        let mediaList = [];
        if(localStorage.getItem("mediaSaved")){
            mediaList = localStorage.getItem("mediaSaved").split(",")
            if(mediaList.includes(PRODUCT_ID.toString())){
                let index = mediaList.indexOf(PRODUCT_ID.toString());
                mediaList.splice(index,1)
                setCheck(false);
                localStorage.setItem("mediaSaved", mediaList)
            } else {
                mediaList.push(PRODUCT_ID)
                setCheck(true);
                localStorage.setItem("mediaSaved", mediaList)
            }
        } else {
            mediaList.push(PRODUCT_ID)
            localStorage.setItem("mediaSaved", mediaList)
        }
    }

    useEffect(() => {
        if(localStorage.getItem("mediaSaved") !== null){
            let mediaList = localStorage.getItem("mediaSaved").split(",");
            if(mediaList.includes(PRODUCT_ID)){
                setCheck(!isChecked);
            }
        } else {
            setLoaded(true);
        }
    }, [apiData])

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
                                    status={apiData["status"]}
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
                                    nota={apiData["meanScore"]}
                                />
                                <p className="contenedorSerie__extra--nota--texto">{apiData["meanScore"] !== null ? apiData["meanScore"] : "N/A"}%</p>
                            </div>
                            <a target="_blank" rel="noopener noreferrer" className="contenedorSerie__extra--linkAnilist" href={`https://anilist.com/${apiData["type"]}/${apiData["id"]}/${apiData["title"]["romaji"].replace(" ","-")}/`}>
                                <img src={require("../assets/images/anilist.png")} alt="Logo de Anilist" className="contenedorSerie__extra--linkAnilist--imagen"/>
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