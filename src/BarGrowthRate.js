import axios from 'axios';
import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory';

// Returns an array of all pokemon growth rates. If I used redux, this would be a thunk creator
const getPokeGrowthRate = async () => {
  const pokeGrowthRateArray = [];
  const pokeGrothRates = await axios.get(
    'https://pokeapi.co/api/v2/growth-rate/'
  );
  pokeGrothRates.data.results.forEach((elem) =>
    pokeGrowthRateArray.push(elem.name)
  );
  // Remove last 2 items b/c first 150 pokemon don't use them
  pokeGrowthRateArray.pop();
  pokeGrowthRateArray.pop();
  // console.log(pokeGrowthRateArray);
  return pokeGrowthRateArray;
};

// Creates the data to input into VictoryChart, with this format:
// {growthRate: "...", total: integer}
const getPokeGrowthRateList = async () => {
  // Get growthRate array from getPokeColors
  const pokeGrowthRateArr = await getPokeGrowthRate();
  // Create growth rate counter array of objects
  const pokeGrowthRateCounter = pokeGrowthRateArr.map((growthRate) => {
    return { growthRate, total: 0 };
  });
  // Add 1 to total if rate matches
  for (let i = 1; i <= 150; i++) {
    let currPoke = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${i}`
    );
    let currPokeGrowthRate = currPoke.data.growth_rate.name;
    for (let j = 0; j < pokeGrowthRateCounter.length; j++) {
      if (currPokeGrowthRate === pokeGrowthRateCounter[j].growthRate) {
        pokeGrowthRateCounter[j].total++;
      }
    }
  }
  console.log('POKEGROWTHRATECOUNTER:', pokeGrowthRateCounter);
  return pokeGrowthRateCounter;
};
// Gets a random # btw 1 and 150
const getRandomPoke = () => {
  return Math.floor(Math.random() * 150) + 1;
};

class BarGrowthRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growthRates: [],
      growthRateList: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    this.setState({
      growthRates: await getPokeGrowthRate(),
      growthRateList: await getPokeGrowthRateList(),
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
          <div id="barGrowthRate">
            <br />

            <h1 className="all-titles">Pokémon Bar Chart: Growth Rate</h1>
            <hr />

            <VictoryChart
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
              domainPadding={20}
            >
              <VictoryLabel
                text="Original 150 Pokémon by Growth Rate"
                x={70}
                y={30}
              />
              <VictoryAxis
                label="Growth Rate Type"
                tickFormat={this.state.growthRates}
                style={{
                  tickLabels: { fontSize: 8 },
                  axisLabel: { padding: 30 },
                }}
              />
              <VictoryAxis
                label="Number of Pokémon"
                dependentAxis
                tickValues={[10, 20, 30, 40, 50, 60, 70, 80]}
                style={{
                  tickLabels: { fontSize: 8 },
                  axisLabel: { padding: 40 },
                }}
              />
              <VictoryBar
                data={this.state.growthRateList}
                x="growthRate"
                y="total"
                style={{
                  data: {
                    fill: 'green',
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

export default BarGrowthRate;
