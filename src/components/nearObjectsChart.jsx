import React, { Component } from 'react';
import Chart from 'react-google-charts';
import { from } from 'rxjs';
import axios from 'axios';
class NearObjectsChart extends Component {
    state = { 
        nearObjects: [],
        visuData : []
    }
    m = "estimated_diameter_m";
    headers = ['NEO Name', 'min', 'max'];
    average(a, b) {
        return (a + b) / 2;
    }
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
                    return console.error(error);
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