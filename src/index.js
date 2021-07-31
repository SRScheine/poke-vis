import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
// Need this to serve up images
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex({
  cacheImages: true,
});

ReactDOM.render(
  <React.StrictMode>
    {/* Need this to serve up images */}
    <script src="https://unpkg.com/pokeapi-js-wrapper/dist/index.js"></script>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
