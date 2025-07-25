import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("");

    const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API)
            const data = await res.json();
            console.log(data);

            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            })
            console.log(detailedPokemonData);

            const detailedResponses = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponses);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setError(error);
        }

    }

    useEffect(() => {
        fetchPokemon();
    }, [])
    if (loading) {
        return (
            <div>
                <h1>loading...</h1>
            </div>
        )
    }

    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        )
    }


    return (
        <>

            <section className="container">
                <header>
                    <h1> lets Catch Pokemon</h1>
                </header>
                <div className="pokemon-search">
                    <input
                        type="text"
                        placeholder="search Pokemon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

            </section>
            <div>
                <ul className="cards">
                    {
                        searchData.map((curPokemon) => {
                            return <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />

                        })}




                </ul>
            </div>

        </>
    )

}