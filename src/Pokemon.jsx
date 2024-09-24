import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {

  const [pokemon, setPokemon] = useState([]);
  const [loading,setLoading] = useState(true);
  const[error,setError] = useState(null);
  const[search,setSearch]=useState("");
 
  const API = "https://pokeapi.co/api/v2/pokemon?limit=104";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const DetailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const pokemonData = await res.json();
        return pokemonData;
      });

      const detailedResponses = await Promise.all(DetailedPokemonData); // Correctly await Promise.all
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

// serch fuctinality

const serchData = pokemon.filter((curPokemon) => curPokemon.name.toLowerCase().includes(search.toLowerCase()));

  if(loading) {
    return(
      <div>
        <h1>Loading....</h1>
      </div>
    );
  };
  if(error) {
    return(
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  };

  return (
    <section className="container">
      <header>
        <h1>Let's catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
        <input type="text" placeholder="search pokemon" value={search} onChange={(e)=> setSearch(e.target.value) } />
      </div>
        <div>
          <ul className="cards">
            {/* {pokemon.map((curPokemon) => { */}
            {serchData.map((curPokemon) => {

              return <PokemonCards key={curPokemon.id}  pokemonData={curPokemon}/>
            })}
          </ul>
        </div>
      
     
    </section>

  );
};
