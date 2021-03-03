import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from './Components/Header/Header';
import { getAllPokemon, getPokemon } from './Components/GetPoke/GetPoke'
import Card from './Components/Card/Card';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }
  const prev = async () => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }
  

  const loadingPokemon = async data => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord;
    }))
    setPokemonData(_pokemonData)
  }

  console.log(pokemonData);
  return (
    <div className="container">
      <div className='btn'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      <Header />
      { loading ? 
      <h1>Loadind...</h1> 
      :(
        <>
        <div className='container'>
          <div className='grid-container'>
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon = {pokemon} />
            })}
          </div>
          <div className='btn'>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
      </div>
        </>
      )}
    </div>
  );
}

export default App;
