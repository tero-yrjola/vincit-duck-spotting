import React from "react";
import axios from "axios";

const serverURL = 'http://localhost:8081/';
const speciesMissingErrorMessage = 'Invalid species. Perhaps you meant one of the following:\n';
const CountUnderZeroErrorMessage = "Count can't be lower than 1!";

export default class AddSightings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionInput: '', speciesInput: '', countInput: ''
    };
  }

  componentDidMount() {
    fetch(serverURL + 'species').then(response => response.json())
      .then(json => {
        this.setState({ validSpecies: json });
      });
  }

  addSighting() {
    if (this.ValidateSpecies(this.state.speciesInput)) {
      if (this.state.countInput > 0) {
        var duckData = {
          id: '', dateTime: new Date().toISOString()
          , description: this.state.descriptionInput, species: this.state.speciesInput.toLocaleLowerCase(), count: this.state.countInput
        }
        axios.post(serverURL + 'sightings', duckData, {
          headers: {
            'Content-Type': 'application/json',
          }
        });        
      } else {
        alert(CountUnderZeroErrorMessage);
      }
    } else {
      var species = eval(this.state.validSpecies).map(species => " " + species.name);

      alert(speciesMissingErrorMessage + species);
    }
  }



  ValidateSpecies(species) {
    var validSpecies = eval(this.state.validSpecies);
    if (validSpecies.some(item => item.name === species.toLocaleLowerCase())) return true;
    return false;
  }

  render() {
    return (
      <div>
        <h1>Add sightings</h1>
        <input value={this.state.descriptionInput} name="descriptionInput"
          onChange={e => this.UpdateInputValue(e)} placeholder="description" />

        <input value={this.state.speciesInput} name="speciesInput"
          onChange={e => this.UpdateInputValue(e)} placeholder="species" />

        <input type="number" value={this.state.countInput} name="countInput"
          onChange={e => this.UpdateInputValue(e)} placeholder="count" />

        <button onClick={this.addSighting.bind(this)} >Add</button>
      </div>
    );
  }

  UpdateInputValue(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
}