function Pokemon({basepokemon, pokemonid, pokemonname, pokemontype, pokemonimage }) {
    return (
      <>
        <div className="pokedex">
          <img className="pokedex-image" src={pokemonimage} alt="profile picture" />
          <h2 className="pokedex-title">[{pokemonid}]{pokemonname}</h2>
          <ul>
            <li className="pokedex-type">{pokemontype[0]}</li>
            <li className="pokedex-type">{pokemontype[1]}</li>
          </ul>
          <div className="pokedex-stats-section">
            <ul>
            {Object.entries(basepokemon).map(([stat, value]) => (
              <li className="pokedex-stats" key={stat}>{stat}: {value}</li>
            ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
  
  export default Pokemon;