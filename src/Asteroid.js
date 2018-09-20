import React, { Component } from 'react';
import { ProgressBar, Table } from 'react-bootstrap'
class Asteroid extends Component{

render() {
  let { asteroid } = this.props;
  // this.props.oneAsteroid
  return(
    <div>

      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Estimated Diameter (feet)</th>
            <th>Date of Closest Approach</th>
            <th>Distance (miles)</th>
            <th>Velocity (miles/hour)</th>
          </tr>
        </thead>
        <tbody>
          <tr key={asteroid.reference_id}>
            <td>{asteroid.name}</td>
            <td>{asteroid.diameter_in_feet.toLocaleString('en')}</td>
            <td>{asteroid.date}</td>
            <td>{asteroid.distance.toLocaleString('en')}<ProgressBar className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{width: asteroid.distance/500000 }}/></td>
            <td>{asteroid.velocity.toLocaleString('en')}</td>
          </tr>


        </tbody>
      </Table>
    </div>
  )
}
}
export default Asteroid;
