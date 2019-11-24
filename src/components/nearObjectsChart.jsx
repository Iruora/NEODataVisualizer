import React, { Component } from 'react';
import { from } from 'rxjs';
import axios from 'axios';
class NearObjectsChart extends Component {
    state = { 
        nearObjects: []
    }
    m = "estimated_diameter_m";
    headers = ['NEO Name', 'min', 'max'];
    average(a, b) {
        return (a + b) / 2;
    }

    componentDidMount() {
        from(axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY'))
            .subscribe(
                data => {
                    const nearObjects = data.data.near_earth_objects;
                    nearObjects.sort(
                        (elt1, elt2) =>  (
                            this.average(
                                elt2.estimated_diameter.kilometers[this.m + 'in'],
                                elt2.estimated_diameter.kilometers[this.m + 'ax']
                            ) - 
                            this.average(
                                elt1.estimated_diameter.kilometers[this.m + 'in'],
                                elt1.estimated_diameter.kilometers[this.m + 'ax']
                            )
                        )
                    );
                    this.setState({nearObjects: nearObjects});
                },
                error => {
                    return console.error(error);
                }
            );
    }
    // ------------------------------
    render() {
        console.log(this);
        return ( 
            <React.Fragment>
                <ul>
                    {
                      this.state.nearObjects.map(
                          e => <li key={e.id}>{e.name}</li>
                      )  
                    }
                </ul>
            </React.Fragment>
        );
    }
}
 
export default NearObjectsChart;