import { useEffect, useState } from "react"
import { Buscador } from "./Buscador";

export const MiApi = () => {
    
    const [info, setInfo] = useState([]);
    const [infoFiltrada, setInfoFiltrada] = useState([]);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        consultarApi();
    }, []);

    useEffect(() => {
        setInfoFiltrada(info);
        setCarga(false);
    }, [info]);

    const consultarApi = async () => {
        try {
            const url = 'https://pokeapi.co/api/v2/pokemon/?limit=120&offset=0';
            const response = await fetch(url);
            const data = await response.json();

            const infoArray = await Promise.all(data.results.map(async ({name, url}) => {
                    const url2 = url;
                    const response2 = await fetch(url2);
                    const data2 = await response2.json();
                    return {
                        name: name,
                        type: data2.types[0].type.name,
                        move1: data2.moves[0].move.name,
                        move2: data2.moves[1].move.name,
                        move3: data2.moves[2].move.name,
                        move4: data2.moves[3].move.name,
                        url: data2.sprites.front_default,
                    }
                })
            ); 
            const infoArrayOrdenado = infoArray.sort((a, b) => {
                return a.name.localeCompare(b.name);
              });
            setInfo(infoArrayOrdenado)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <header>
            <Buscador info={info} setInfoFiltrada={setInfoFiltrada} />
        </header>
        <div className="row data">
            {
                !carga?
                infoFiltrada.map(({key, name, type, move1, move2, move3, move4, url}) => {
                        return (
                            <div key={`${name}${key}`} className="d-flex justify-content-center col-12 col-md-6 col-lg-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h1>{name}</h1>
                                        </div>
                                        <img alt={name} src={url} />
                                        <h3>Type</h3>
                                            <span>{type}</span>
                                        <h3>Moves</h3>
                                        <ul>
                                            <li>
                                                {move1}
                                            </li>
                                            <li>
                                                {move2}
                                            </li>
                                            <li>
                                                {move3}
                                            </li>
                                            <li>
                                                {move4}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                :<div></div>
            }
        </div>
        </>
    )
}
