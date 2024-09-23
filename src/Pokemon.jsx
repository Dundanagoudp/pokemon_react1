// import { useEffect, useState } from "react";
// import "./index.css";

// export const Pokemon=()=>{

//       const[pokemon,setPokemon]=useState([]);

//       const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

//       const fetchPokemon=async()=>{
//             try {
//                   const res  = await fetch(API);
//                   const  data = await res.json();
//             //      console.log(data);

//                  const DetailedPokemonDate = data.results.map(async(curPokemon)=>{
//                   const res = await fetch(curPokemon.url)
//                   const data = await res.json();
//                   return data;
//                  });
//             //      console.log(DetailedPokemonDate);

//                  const detailedResponses = Promise.all(detailedResponses);
//                  console.log(detailedResponses);
//                  setPokemon(detailedResponses);
//             } catch (error) {
//                   console.log(error);
//             }
//       };
//       useEffect(()=>{
//             fetchPokemon();
//       }, [])

//       return(
//             <section className="conatiner">
//           <header>
//             <h1> lets catch Pokemon</h1>
//             <div>
//                   <ul className="cards">
//                         {
//                               pokemon.map((curPokemon)=>{
//                                     return <li key={curPokemon.id}>{pokemon.name}</li>
//                               })
//                         }
      
//                   </ul>
//             </div>
//           </header>
//             </section>
//       );
// };

import { useEffect, useState } from "react";
import "./index.css";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=24";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API); // Use fetch, not fetchPokemon
      const data = await res.json();
      // console.log(data);

      const detailedPokemonData = await Promise.all(
        data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url);
          const data = await res.json();
          return data;
        })
      );
      
      // console.log(detailedPokemonData);
      setPokemon(detailedPokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <section className="container">
      <header>
        <h1>Let's catch Pokémon!</h1>
        <div>
          <ul className="cards">
            {pokemon.map((curPokemon) => (
              <li key={curPokemon.id}>
                <h3>{curPokemon.name}</h3>
                {/* <img src={curPokemon.sprites.front_default} alt={curPokemon.name} /> */}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </section>
  );
};
