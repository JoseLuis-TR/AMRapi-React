import React, {useRef, useState, useEffect} from "react";
import Header from './header';
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function ProductDetails(props) {
    const location = useLocation()
    let link = "";
    const PRODUCT_ID = location.state["id"];
    let accents = require('remove-accents');
    const formRef = useRef();
    const [genre, setGenre] = useState("indefinido");
    const [age, setAge] = useState("indefinido");
    const [avgScore, setAvgScore] = useState("indefinido");
    const [status, setStatus] = useState("indefinido");
    const [type, setType] = useState("indefinido");
    const [apiData, setApiData] = useState({undefined:undefined});
    const [isLoaded, setLoaded] = useState(false);

    async function fetchData(id){
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

        await fetch(url, options).then(handleResponse)
                        .then(handleData)
                        .catch(handleError);
    }

    function handleResponse(response) {
        console.log(response);
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        setApiData(data);
        let resultados
        Object.entries(data).forEach(([label,values])=>{
            resultados = values.Page.media[0];
            //setApiData(resultados)
            console.log(apiData)
        })
    }

    function handleError(error) {
        setApiData(undefined)
        console.error(error);
    }

    useEffect( () =>{
        console.log(isLoaded)
        fetchData(PRODUCT_ID);
        setLoaded(true)
        console.log(isLoaded)
    }, );
    if(isLoaded){
        return (
            <>
                <Helmet>
                    <title>{`AMR - ${apiData["title"]["romaji"]}`}</title>
                </Helmet>
                <Header 
                    titulo={apiData["title"]["romaji"]}
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
                                <p class="contenedorSerie__info--basico--texto">{apiData["episodes"]} capitulos</p>
                            </div>
                        </section>
                        <section class="contenedorSerie__sinopsis">
                            <p class="contenedorSerie__sinopsis--texto">
                                {apiData["description"]}
                            </p>
                        </section>
                        <section class="contenedorSerie__extra">
                            <div class="contenedorSerie__extra--nota">
                                <img src="/src/assets/images/smile.png" alt="Smile" class="contenedorSerie__extra--nota--imagen"/>
                                <p class="contenedorSerie__extra--nota--texto">90%</p>
                            </div>
                            <a class="contenedorSerie__extra--linkAnilist" href={`https://anilist.com/${apiData["type"]}/${apiData["id"]}/${apiData["title"]["romaji"].replace(" ","-")}/`}>
                                <img src="/src/assets/images/anilist.png" alt="Logo de Anilist" class="contenedorSerie__extra--linkAnilist--imagen"/>
                                <p class="contenedorSerie__extra--linkAnilist--texto">Ver + info</p>
                            </a>
                        </section>
                        <footer class="contenedorSerie__footer">
                            <section class="contenedorSerie__footer--generos">
                                <p class="contenedorSerie__footer--generos--texto">acción</p>
                                <p class="contenedorSerie__footer--generos--texto">drama</p>
                            </section>
                            <section class="contenedorSerie__footer--checkbox">
                                <input id="check-prod" type="checkbox" class="contenedorSerie__footer--checkbox--check"/>
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