import axios from 'axios';
import React from 'react';
import {
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from 'victory';
// Creates the data to input into VictoryChart, with this format:
// {id: integer, moves: integer}
const getPokeMovesList = async () => {
  const pokeMovesArr = [];
  for (let i = 1; i <= 150; i++) {
    let currPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let numMoves = currPoke.data.moves.length;
    pokeMovesArr[i - 1] = { id: i, moves: numMoves };
  }
  console.log('pokeMovesArr: ', pokeMovesArr);
  return pokeMovesArr;
};

const getRandomPoke = () => {
  return Math.floor(Math.random() * 150) + 1;
};

class LineMoves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movesList: [],
      isLoaded: false,
    };
  }

  async componentDidMount() {
    this.setState({
      movesList: await getPokeMovesList(),
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
          <div id="line-moves">
            <br />

            <h1 className="all-titles">Pokémon Line Graph: Moves</h1>
            <hr />
            <VictoryChart
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
              domainPadding={20}
              width={1000}
            >
              <VictoryLabel
                text="Number of Moves, Original 150 Pokémon"
                x={385}
                y={10}
              />
              <VictoryLabel
                text="Click the Graph!"
                x={450}
                y={40}
                style={[{ fontSize: 10 }]}
              />
              <VictoryAxis
                label="Pokédex ID"
                tickValues={[0, 25, 50, 75, 100, 125, 150]}
                style={{
                  axisLabel: { padding: 30 },
                  tickLabel: { padding: 10 },
                }}
              />
              <VictoryAxis
                label="Number of Moves"
                dependentAxis
                tickValues={[0, 25, 50, 75, 100, 125]}
                style={{
                  axisLabel: { padding: 40 },
                  tickLabel: { padding: 10 },
                }}
              />
              <VictoryArea
                style={{ data: { fill: 'black' } }}
                data={this.state.movesList}
                x="id"
                y="moves"
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onClick: () => {
                        return [
                          {
                            eventKey: 'all',
                            mutation: (props) => {
                              const fillColors = [
                                'black',
                                'red',
                                'blue',
                                'yellow',
                                'maroon',
                                'purple',
                                'orange',
                                'cyan',
                                'green',
                                'pink',
                              ];

                              const currFill = props.style.fill;
                              const currFillIdx = fillColors.indexOf(currFill);
                              const nextFillIdx = (currFillIdx + 1) % 10;

                              return {
                                style: { fill: fillColors[nextFillIdx] },
                              };
                            },
                          },
                        ];
                      },
                    },
                  },
                ]}
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

export default LineMoves;
