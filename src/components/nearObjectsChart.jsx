import React, { Component } from 'react';
import Chart from 'react-google-charts';
import { from } from 'rxjs';
import axios from 'axios';
/* 
    Nidhal AROURI 
    24/11/2019
    Botify/
*/
// ------------NEO Bar Chart--------------
class NearObjectsChart extends Component {
    // ----------State--------------
    state = { 
        nearObjects: [], // Contains NEO got from API
        visuData : [] // Contains visualization data
    }
    m = "estimated_diameter_m"; // to minimize attribute length
    headers = ['NEO Name', 'min', 'max']; // Chart headers
    // ------------average(a, b)- Calculates a and b average-------------
    average(a, b) {
        return (a + b) / 2;
    }
    // ------------Tronsform API data to visualization data structure-------------------
    mapNearObjectToVisu(nearObjects) {
        
        return nearObjects.map(
            e => {
                return [
                    e.name,
                    e.estimated_diameter.kilometers.estimated_diameter_min,
                    e.estimated_diameter.kilometers.estimated_diameter_max
                ];
            }
        );
    }
    // -------------------------React Life-cycle hook / executed after the component has been mounted---------------------------
    componentDidMount() {
        from(axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')) // API call transformed to Observable
            .subscribe(
                data => {
                    const nearObjects = data.data.near_earth_objects;
                    
                    // sorting fetched data [DESC, AVG-estimated_diameter.kilometers]
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
                    // change nearObjects state
                    this.setState(
                        {nearObjects: nearObjects}
                    );
                    // change visuData's state after updating nearObjects
                    this.setState(
                        {
                            visuData: [
                                this.headers, 
                                ...this.mapNearObjectToVisu(this.state.nearObjects)
                            ]
                        }
                    );
                },
                error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the 
                        // browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                }
            );
    }
    // ------------------------------
    render() {
        console.log(this);
        return ( 
            <React.Fragment>
                <Chart
                    width={'800px'}
                    height={'800px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={
                        this.state.visuData
                    }
                    options={{
                    title: 'NASA NEO',
                    chartArea: { width: '70%' },
                    hAxis: {
                        title: 'Min Estimated diameter (km)',
                        minValue: 0,
                    },
                    vAxis: {
                        title: 'NEO Name',
                    },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                />
            </React.Fragment>
        );
    }
}
 
export default NearObjectsChart;