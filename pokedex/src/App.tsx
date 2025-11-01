import "./App.css";

import { useEffect, useState, useRef } from "react";
import { POKEMON_BASE_URL } from "./constants";
import PokemonCard from "./components/PokemonCard";

export type PokemonData = {
  name: string;
  url: string;
};

function App() {
  const [inputPokemon, setInputPokemon] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [fetchedPokemonData, setFetchedPokemonData] = useState<PokemonData[]>(
    []
  );

  const [isSorted, setIsSorted] = useState(false);
  const filteredPokemonData = fetchedPokemonData.filter(
    (pokemon: PokemonData) => {
      return pokemon.name.includes(inputPokemon);
    }
  );

  const displayedPokemonData = isSorted
    ? filteredPokemonData.sort((a, b) => a.name.localeCompare(b.name))
    : filteredPokemonData;
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputPokemon(e.target.value);
  };

  const limit = 25;

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    // console.log("formData", formData);

    if (formData.has("searchPokemon")) {
      setInputPokemon(formData.get("searchPokemon")!.toString());
    }
  };

  const getPokemon = async (offset: number, limit: number) => {
    let fetchPokemonResult;
    setIsLoading(true);

    fetchPokemonResult = await fetch(
      `${POKEMON_BASE_URL}pokemon?offset=${offset}&limit=${limit}`
    );

    if (!fetchPokemonResult.ok) {
      setError(true);
      setIsLoading(false);
      return;
    }
    console.log("fetchPOkemonResult", fetchPokemonResult);
    const fetchPokemonJson = await fetchPokemonResult.json();
    console.log("fetchPokemonJson", fetchPokemonJson);
    setFetchedPokemonData((d) => [...d, ...fetchPokemonJson.results]);
    setOffset((o) => o + limit);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!bottomRef.current) return;
    if (isLoading) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        getPokemon(offset, limit);
      }
    });
    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [offset, limit, bottomRef]);

  return (
    <>
      <div className="app">
        <form className="appForm" onSubmit={onSubmitForm}>
          <div className="searchDiv">
            <input
              placeholder="pokemon"
              name="searchPokemon"
              value={inputPokemon}
              onChange={onInputChange}
            ></input>
            <span className="searchIcon">
              <button className="searchButton" type="submit">
                {/* <img src="https://img.icons8.com/ios7/512/search.png" /> */}
              </button>
            </span>
          </div>
          <button onClick={() => setIsSorted((s) => !s)}>sort</button>
        </form>
        <div className="pokemonGrid">
          {displayedPokemonData?.map((pokemonData: PokemonData) => {
            return (
              <PokemonCard
                pokemonData={pokemonData}
                key={pokemonData.name}
              ></PokemonCard>
            );
          })}
        </div>
        <div ref={bottomRef}></div>
      </div>
    </>
  );
}

export default App;

// Pagination
// Retriving card
// sorting data
// infinity scroll
// individual pages
