import React from "react";
import axios from "axios";
import Sighting from "../components/Sighting";

const serverURL = 'http://localhost:8081/';
const DefaultSightingsJson = '[{"id":"","species":"bad-luck-duck","description":"Couldnt fetch species from server, it might be offline","dateTime":"","count":0}]';

export default class InspectSightings extends React.Component {
  constructor() {
    super();
    this.state = {
      sightings: JSON.parse(DefaultSightingsJson)
    }
  }

  componentDidMount() {
    fetch(serverURL + 'sightings').then(response => response.json())
      .then(json => {
        this.setState({ sightings: json });
      });
  }

  descendingSightings(ascending) {
    var data = eval(this.state.sightings);
    var sortJsonArray = require('sort-json-array');
    if (ascending) {
      data.reverse();
    }

    function comp(a, b) {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    }
    if (ascending)
      this.setState({
        sightings: data.sort(comp)
      });
    else {
      this.setState({
        sightings: data.sort(comp).reverse()
      });
    }
  }



  render() {

    const { sightings } = this.state;
    const SightingComponents = sightings.map((sighting) => {
      return <Sighting key={sighting.id} {...sighting} />
    });
    return (
      <div>
        <h1>Sightings</h1>
        <button onClick={this.descendingSightings.bind(this, true)}>Descending</button>
        <button onClick={this.descendingSightings.bind(this, false)}>Ascending</button>
        <ul>{SightingComponents}</ul>
      </div>
    );
  }
}
