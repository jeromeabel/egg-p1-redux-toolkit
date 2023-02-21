import { useGetPokemonDetailsQuery } from '../app/apiSlice';

const PokemonDetails = ({ pokemonName }) => {
  const { data, isLoading, isError, isUninitialized } =
    useGetPokemonDetailsQuery({
      name: pokemonName,
    });

  if (isUninitialized || isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong!</p>;
  }

  return (
    <article>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <ul>
        <li>id: {data.id}</li>
        <li>height: {data.height}</li>
        <li>weight: {data.weight}</li>
      </ul>
    </article>
  );
};

export default PokemonDetails;
