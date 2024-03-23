import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function Pokedex() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    setLoading(true); // Set loading to true when switching pages
    const url = `https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`;
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        setData(response.data);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setLoading(false); // Set loading to false after fetching data
      });
  }, [currentPage]);

  const handleClick = (lang) => {
    setLanguage(lang);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBackClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => handleClick("english")}>English</button>
        <button onClick={() => handleClick("japanese")}>Japanese</button>
        <button onClick={() => handleClick("chinese")}>Chinese</button>
        <button onClick={() => handleClick("french")}>French</button>
      </div>
      <div>
      <p>{currentPage} out of {totalPages}</p> {/* Page counter */}
        <button onClick={handleBackClick} disabled={currentPage === 1}>Back</button>
        {Array.from({ length: 15 }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextClick} disabled={currentPage === 15}>Next</button>
      </div>
      {loading ? (
        <p>Loading...</p> // Show "Loading" text while switching pages
      ) : (
        data.map((pokemon) => (
          <Pokemon
            key={pokemon.id}
            pokemonid={pokemon.id}
            pokemonname={pokemon.name[language]}
            pokemontype={pokemon.type}
            pokemonimage={pokemon.image}
            basepokemon={pokemon.base}
          />
        ))
      )}
    </>
  );
}

export default Pokedex;