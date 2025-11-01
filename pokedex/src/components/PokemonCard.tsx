import { useEffect, useState } from "react";
import { type PokemonData } from "./../App";
import "./PokemonCard.css";

const PokemonCard = ({ pokemonData }: { pokemonData: PokemonData }) => {
  const [spriteUrl, setSpriteUrl] = useState("");

  const getSpecificPokemonData = async () => {
    const response = await fetch(pokemonData.url);
    if (!response.ok) {
      return;
    }
    const responseJson = await response.json();
    setSpriteUrl(responseJson.sprites.front_default);
    console.log("responseJson", responseJson);
  };

  useEffect(() => {
    getSpecificPokemonData();
  }, []);
  return (
    <div className="card">
      <div>
        <img src={spriteUrl} />
      </div>
      {pokemonData.name}
    </div>
  );
};

export default PokemonCard;
