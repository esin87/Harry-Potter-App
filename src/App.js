import React, { Component } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import House from './components/House';
import CharStats from './components/CharStats';
import Character from './components/Character';
// created data file so homepage displays even if API server goes down
// import houseData from './data/houses.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // houses: { houseData },
      houses: [],
      characters: []
    };
  }
  componentDidMount() {
    const apiKey = process.env.REACT_APP_HP_KEY;
    const housesUrl = `https://www.potterapi.com/v1/houses?key=${apiKey}`;
    const charactersUrl = `https://www.potterapi.com/v1/characters?key=${apiKey}`;

    fetch(housesUrl)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ houses: [response] });
      });

    fetch(charactersUrl)
      .then(response => response.json())
      .then(response => {
        this.setState({ characters: [response] });
      });
  }

  render() {
    console.log(this.state.houses);
    return (
      <div>
        <header className="app-header">
          <nav>
            <Link className="home-link" to="/">
              Harry Potter Home
            </Link>
            <Link className="characters-link" to="/CharStats">
              Characters
            </Link>
          </nav>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home houses={this.state.houses} />}
            />
            <Route
              exact
              path="/CharStats"
              render={() => <CharStats characters={this.state.characters} />}
            />
            <Route
              exact
              path="/houses/:house"
              render={props => <House {...props} house={this.state.houses} />}
            />
            <Route
              exact
              path="/characters/:character"
              render={props => (
                <Character {...props} character={this.state.characters} />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
