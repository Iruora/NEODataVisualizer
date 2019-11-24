import React, { Component } from 'react';
import NearObjectsChart from './nearObjectsChart';
import DataFilter from './dataFilter';
import DataTable from './dataTable';
import axios from 'axios';
import { from } from 'rxjs';
class NearObjects extends Component {
    // ----------State--------------
    state = { 
        nearObjects: [], // Contains NEO got from API
        visuData : [], // Contains visualization data
        selectedOrbitingObj : '', // to be showed as indicator to user
        gotData: true, // true whether we've got data after filtering
        toggle: true // true shows chart otherwise shows table
    }
    m = "estimated_diameter_m"; // to minimize attribute length
    headers = ['NEO Name', 'min', 'max']; // Chart headers
    // ----------------------------------Toggles toggle state-------------------------------
    toggle() {
        this.setState({toggle: !this.state.toggle});
    }
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
    // ------------Get only elements with non-empty close approach data------------------
    getWithCloseApproachData(neoArray) {
        return neoArray.filter(
            e => e.close_approach_data.length > 0
        );
    }
    // ------------Filter by orbiting body from data-------------------
    getCloseApproachDataByOrbitingBody(orbitingBody, from) {
        let result = [];
        from.forEach(
            e => {
                // console.warn(`orbbody`, e.close_approach_data);
                e.close_approach_data
                .forEach(
                    elt => {
                        if (elt.orbiting_body === orbitingBody) {
                            result.push(e);
                        }
                    }
                );
            }
        );
        return result;
    }
    // ------------------------------
    // ------Handle filtering event------------------------
    handelFilter(filterBy) {
        this.setState({selectedOrbitingObj: filterBy});
        const {nearObjects} = this.state; // get near objects from state
        let filtered = this.getWithCloseApproachData(nearObjects);
        const finals = Array.from(
            new Set(this.getCloseApproachDataByOrbitingBody(filterBy, filtered))
        );
        if (finals.length !== 0) { // if we got elements in return we display
            this.setState(
                {
                    visuData: [
                        this.headers, 
                        ...this.mapNearObjectToVisu(finals)
                    ],
                    gotData: true
                }
            );
        } else { // if no elements we return empty data to throm Chart no column error
            this.setState(
                {
                    gotData: false
                }
            );
        }
    }
    render() {
        return (
            <React.Fragment>
                <DataFilter 
                    onFilter={
                        (e) => this.handelFilter(e)
                    } 
                    selectedOrbitingObj={
                        this.state.selectedOrbitingObj
                    }>
                </DataFilter>
                <button className="btn btn-primary" onClick={() => this.toggle()}>
                    {`${this.state.toggle ? 'table' : 'chart'}`}
                </button>
                {
                    this.state.gotData ? 
                    (this.state.toggle ? 
                        <NearObjectsChart 
                            visuData={this.state.visuData} 
                        >
                        </NearObjectsChart> : 
                        <DataTable visuData={this.state.visuData}></DataTable>
                    ) :
                    <span className="alert alert-danger">No data to show</span>
                }
            </React.Fragment>
        );
    }
}
 
export default NearObjects;