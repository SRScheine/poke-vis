import axios from 'axios';
import React from 'react';
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryLegend,
} from 'victory';

const pokeData = [];
const pokeColorArr = [];
const pokeNameArr = [];

// Sets up pokeData, pokeName, and pokeColor arrays
// Note, should do this in Redux or as a pure fuction, without global variables
const getPokemon = async (poke1, poke2, poke3) => {
  const poke1Info = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${poke1}/`
  );
  const poke2Info = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${poke2}/`
  );
  const poke3Info = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${poke3}/`
  );

  console.log(`${poke1} FULL INFO:`, poke1Info.data);
  const pokeArr = [poke1Info.data, poke2Info.data, poke3Info.data];
  if (pokeData.length) {
    pokeData.pop();
    pokeData.pop();
    pokeData.pop();
  }
  pokeArr.forEach((poke) =>
    pokeData.push({
      HP: poke.stats[0].base_stat,
      Attack: poke.stats[1].base_stat,
      Defense: poke.stats[2].base_stat,
      SpAttack: poke.stats[3].base_stat,
      SpDefense: poke.stats[4].base_stat,
      Speed: poke.stats[5].base_stat,
    })
  );

  const poke1Species = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${poke1}/`
  );
  const poke2Species = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${poke2}/`
  );
  const poke3Species = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${poke3}/`
  );
  const colorArr = [
    poke1Species.data.color.name,
    poke2Species.data.color.name,
    poke3Species.data.color.name,
  ];
  if (pokeColorArr.length) {
    pokeColorArr.pop();
    pokeColorArr.pop();
    pokeColorArr.pop();
  }
  colorArr.forEach((pokeColor) => pokeColorArr.push(pokeColor));
  if (pokeNameArr.length) {
    pokeNameArr.pop();
    pokeNameArr.pop();
    pokeNameArr.pop();
  }

  pokeArr.forEach((poke) =>
    pokeNameArr.push(poke.name[0].toUpperCase() + poke.name.slice(1))
  );
  console.log('POKENAMEINFO: ', pokeNameArr);
  console.log('POKECOLORINFO: ', pokeColorArr);
};

class Radars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      maxima: {},
      isLoaded: false,
    };
  }

  async componentDidMount() {
    await getPokemon('caterpie', 'growlithe', 'squirtle');
    this.setState({
      data: this.processData(pokeData),
      maxima: this.getMaxima(pokeData),
      isLoaded: true,
    });
  }

  componentWillUnmount() {
    this.setState({
      data: [],
      maxima: {},
      isLoaded: false,
    });
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    console.log('THIS.STATE: ', this.state);
    return (
      <div>
        {this.state.isLoaded ? (
          <div id="radar">
            <br />
            <h1 className="all-titles">Pokémon Base Stat Comparison Radar</h1>
            <hr />

            <VictoryChart
              polar
              theme={VictoryTheme.material}
              domain={{ y: [0, 1] }}
            >
              <VictoryLegend
                x={0}
                y={0}
                itemsPerRow={1}
                title="Pokémon"
                centerTitle
                orientation="horizontal"
                gutter={15}
                style={{
                  border: { stroke: 'black' },
                  title: { fontSize: 10 },
                  labels: { fontSize: 10 },
                }}
                data={[
                  {
                    name: pokeNameArr[0] || 'One',
                    symbol: { fill: pokeColorArr[0], type: 'minus' },
                  },
                  {
                    name: pokeNameArr[1] || 'Two',
                    symbol: { fill: pokeColorArr[1], type: 'minus' },
                  },
                  {
                    name: pokeNameArr[2] || 'Three',
                    symbol: { fill: pokeColorArr[2], type: 'minus' },
                  },
                ]}
              />
              <VictoryGroup
                colorScale={pokeColorArr}
                style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
              >
                {this.state.data.map((data, i) => {
                  return <VictoryArea key={i} data={data} />;
                })}
              </VictoryGroup>
              {Object.keys(this.state.maxima).map((key, i) => {
                return (
                  <VictoryPolarAxis
                    key={i}
                    dependentAxis
                    style={{
                      axisLabel: { padding: 10 },
                      axis: { stroke: 'none' },
                      grid: { stroke: 'grey', strokeWidth: 0.25, opacity: 0.5 },
                    }}
                    tickLabelComponent={
                      <VictoryLabel labelPlacement="vertical" />
                    }
                    labelPlacement="perpendicular"
                    axisValue={i + 1}
                    label={key}
                    tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                    tickValues={[0.25, 0.5, 0.75]}
                  />
                );
              })}
              <VictoryPolarAxis
                labelPlacement="parallel"
                tickFormat={() => ''}
                style={{
                  axis: { stroke: 'none' },
                  grid: { stroke: 'grey', opacity: 0.5 },
                }}
              />
            </VictoryChart>
            <div className="img-container">
              <img
                className="center-radar"
                alt="Caterpie"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg"
              />
              <img
                className="center-radar"
                alt="Growlithe"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/58.svg"
              />
              <img
                className="center-radar"
                alt="Squirtle"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg"
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

export default Radars;
