import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { ProgressBar, Table } from 'react-bootstrap'
// import neoData from './sample-neo' //JS: not needed with FETCH
import issData from './ISS-sample'
import './App.css'
import Asteroid from './Asteroid'

//JS: API key: NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo

class App extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      // rawData: neoData, //JS: not needed with FETCH
      asteroids: [],
      issData: issData,
      apiKey: "IC2fHe32598BYbUsZwlt3o0s58ovmIsolE7Tz6Cx",
      apiUrl:"https://api.nasa.gov/neo/rest/v1/feed",
      startDate: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    }
  }

  componentWillMount(){
    fetch(`${this.state.apiUrl}?start_date=${this.state.startDate}&api_key=${this.state.apiKey}`).then((rawResponse)=>{

      // rawResponse.json() returns a promise that we pass along
      return rawResponse.json()
    }).then((parsedResponse) => {

      // when this promise resolves, we can work with our data
      let neoData = parsedResponse.near_earth_objects
      let newAsteroids = []

      Object.keys(neoData).forEach((date)=>{
        neoData[date].forEach((asteroid) =>{
          newAsteroids.push({
            reference_id: asteroid.neo_reference_id,
            name: asteroid.name,
            diameter_in_feet: parseInt(asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0) + asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0) / 2 ),
            date: asteroid.close_approach_data[0].close_approach_date,
            distance: parseInt(asteroid.close_approach_data[0].miss_distance.miles),
            velocity: parseInt(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)
          })
        })
      })

      // state is updated when promises are resolved
      this.setState({asteroids: newAsteroids})
    })
  }

//NOTE: JS: componentWillMount without FETCH:

  //   componentWillMount(){
  //     // Get hold of the part of the response we are interested in
  //     let neoData = this.state.rawData.near_earth_objects
  //
  //     // Instantiate a new array to hold our mapped data
  //     let newAsteroids = []
  //
  //     // To iterate of attributes of a JS Object, we call: Object.keys()
  //     Object.keys(neoData).forEach((date)=>{
  //
  //       // Object.keys returns the name of the attribute, so we need to access that attribute
  //       // on our data structure, and loop over each asteroid it contains
  //       neoData[date].forEach((asteroid) =>{
  //
  //         // Now that we have the asteroid, we can add it to our newAsteroids array
  //         newAsteroids.push({
  //           reference_id: asteroid.neo_reference_id,
  //           name: asteroid.name,
  //           diameter_in_feet: parseInt(asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0) + asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0) / 2 ),
  //           date: asteroid.close_approach_data[0].close_approach_date,
  //           distance: parseInt(asteroid.close_approach_data[0].miss_distance.miles),
  //           velocity: parseInt(asteroid.close_approach_data[0].relative_velocity.miles_per_hour)
  //
  //           // // Calling '.toFixed(0)' on a float cuts off everything behind the decimal point.
  //           // // This formats the information for a good user experience.
  //           // diameterMin: asteroid.estimated_diameter.feet.estimated_diameter_min.toFixed(0),
  //           // diameterMax: asteroid.estimated_diameter.feet.estimated_diameter_max.toFixed(0),
  //           // closestApproach: asteroid.close_approach_data[0].miss_distance.miles,
  //           // velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(0),
  //           // distance: asteroid.close_approach_data[0].miss_distance.miles
  //         })
  //       })
  //     })
  //
  //     // Finally, now that we have collected all the asteroids, we can assign them to state
  //     // so that we can use them later on in the render function
  //     this.setState({asteroids: newAsteroids}) //this creates a new state 'asteroids'
  // }

  render() {
    console.log(this.state.asteroids);
    console.log(this.state.startDate);
    console.log(this.state);
    let { asteroids } = this.state;

    // let asteroid_list = asteroids.map((item) => {
    //   return (<p>{item.name}</p>)
    // });

    return (
      <div>
        <Jumbotron>
          <h1> Asteroids </h1>
          <p> ISS is currently at latitude: {this.state.issData.iss_position.latitude} longitude: {this.state.issData.iss_position.longitude} </p>
        </Jumbotron>

        {this.state.asteroids.map((asteroid)=>{
          return(<Asteroid asteroid = {asteroid}/>)}
        )}
      </div>
    );
  }
}

export default App;
