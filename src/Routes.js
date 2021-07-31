import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Radars from './Radars';
import Navbar from './Navbar';
import BarColor from './BarColor';
import BarGrowthRate from './BarGrowthRate';
import ChartList from './ChartList';
import LineMoves from './LineMoves';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/pokemon/radars" component={Radars} />
              <Route path="/pokemon/barcolor" component={BarColor} />
              <Route path="/pokemon/bargrowthrate" component={BarGrowthRate} />
              <Route path="/pokemon/linemoves" component={LineMoves} />
              <Route exact path="/pokemon/" component={ChartList} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default Routes;
