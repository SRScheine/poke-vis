import axios from 'axios';
import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory';

// Returns an array of all pokemon colors. If I used redux, this would be a thunk creator
const getPokeColors = async () => {
  const pokeColorArray = [];
  const pokeColors = await axios.get(
    'https://pokeapi.co/api/v2/pokemon-color/'
  );
  pokeColors.data.results.forEach((elem) => pokeColorArray.push(elem.name));
  // console.log(pokeColorArray);
  return pokeColorArray;
};

// Creates the data to input into VictoryChart, with this format:
// {color: "...", total: integer}
const getPokeColorsList = async () => {
  // Get color array from getPokeColors
  const pokeColorArr = await getPokeColors();
  // Create color counter array of objects
  const pokeColorCounter = pokeColorArr.map((color) => {
    return { color, total: 0 };
  });
  // Add 1 to total if color matches
  for (let i = 1; i <= 150; i++) {
    let currPoke = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${i}`
    );
    let currPokeColor = currPoke.data.color.name;
    for (let j = 0; j < pokeColorCounter.length; j++) {
      if (currPokeColor === pokeColorCounter[j].color) {
        pokeColorCounter[j].total++;
      }
    }
  }
  console.log('POKECOLORCOUNTER:', pokeColorCounter);
  return pokeColorCounter;
};

// Gets a random # btw 1 and 150
const getRandomPoke = () => {
  return Math.floor(Math.random() * 150) + 1;
};

class BarColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      pokeColorsList: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    this.setState({
      colors: await getPokeColors(),
      pokeColorsList: await getPokeColorsList(),
      isLoaded: true,
    });
  }

  componentWillUnmount() {
    this.setState({ isLoaded: false });
  }

  render() {
    console.log('THIS.STATE: ', this.state);

    return (
      <div>
        {this.state.isLoaded ? (
          <div id="barColor">
            <br />
            <h1 className="all-titles">Pokémon Bar Chart: Colors</h1>
            <hr />

            <VictoryChart
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
              domainPadding={20}
            >
              <VictoryLabel
                text="Original 150 Pokémon by Color"
                x={85}
                y={30}
              />
              <VictoryAxis
                label="Pokémon Color"
                tickFormat={this.state.colors}
                style={{
                  tickLabels: { fontSize: 8 },
                  axisLabel: { padding: 30 },
                }}
              />
              <VictoryAxis
                label="Number of Pokémon"
                dependentAxis
                tickValues={[5, 10, 15, 20, 25, 30, 35]}
                style={{
                  tickLabels: { fontSize: 8 },
                  axisLabel: { padding: 40 },
                }}
              />
              <VictoryBar
                data={this.state.pokeColorsList}
                x="color"
                y="total"
                style={{
                  data: {
                    fill: ({ datum }) => datum.color,
                    stroke: 'black',
                    strokeWidth: 1,
                  },
                }}
              />
            </VictoryChart>
            <div className="img-container">
              <img
                className="center-radar"
                alt="1"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
              />
              <img
                className="center-radar"
                alt="2"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
              />
              <img
                className="center-radar"
                alt="3"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getRandomPoke()}.svg`}
              />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default BarColor;
