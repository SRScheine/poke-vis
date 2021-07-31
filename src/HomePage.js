import React from 'react';

const getRandomPoke = () => {
  return Math.floor(Math.random() * 150) + 1;
};

const HomePage = () => {
  return (
    <div id="home-page">
      <h1 className="all-titles">
        Welcome to Poké-Vis! This is your home for all Pokémon data
        visualizations. Click on "Poké Charts" above to begin!
      </h1>
      <br />
      <div className="img-container">
        <img
          className="center-home"
          alt="1"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
        />
        <img
          className="center-home"
          alt="2"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
        />
        <img
          className="center-home"
          alt="3"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
        />
      </div>
    </div>
  );
};

export default HomePage;
