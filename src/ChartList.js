import React from 'react';
import { Link } from 'react-router-dom';

const getRandomPoke = () => {
  return Math.floor(Math.random() * 150) + 1;
};

const ChartList = () => {
  return (
    <div>
      <div id="chart-list-container">
        <br />
        <h1 className="all-titles">All Pokémon Charts</h1>
        <div id="chart-list">
          <div className="single-chart-container">
            <Link to={'/pokemon/barcolor'} style={{ textDecoration: 'none' }}>
              <div className="single-chart">
                <div className="img-box-chart">
                  <img
                    className="img-chart"
                    alt="1"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
                  />
                </div>
                <div className="single-chart-title">
                  <h2>Pokémon Colors</h2>
                </div>
              </div>
            </Link>
            <Link
              to={'/pokemon/bargrowthrate'}
              style={{ textDecoration: 'none' }}
            >
              <div className="single-chart">
                <div className="img-box-chart">
                  <img
                    className="img-chart"
                    alt="2"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
                  />
                </div>
                <div className="single-chart-title">
                  <h2>Pokémon Growth Rate</h2>
                </div>
              </div>
            </Link>
            <Link to={'/pokemon/radars'} style={{ textDecoration: 'none' }}>
              <div className="single-chart">
                <div className="img-box-chart">
                  <img
                    className="img-chart"
                    alt="3"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
                  />
                </div>
                <div className="single-chart-title">
                  <h2>Pokémon Stat Comparison</h2>
                </div>
              </div>
            </Link>
            <Link to={'/pokemon/linemoves'} style={{ textDecoration: 'none' }}>
              <div className="single-chart">
                <div className="img-box-chart">
                  <img
                    className="img-chart"
                    alt="4"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
                  />
                </div>
                <div className="single-chart-title">
                  <h2>Pokémon Moves Comparison</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartList;
