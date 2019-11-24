import React, { Component } from 'react';
import NearObjectsChart from './nearObjectsChart';
import DataFilter from './dataFilter';
import axios from 'axios';
import { from } from 'rxjs';
class NearObjects extends Component {
    state = { 
    }
    
    render() {
        return (
            <React.Fragment>
                <DataFilter></DataFilter>
                <NearObjectsChart>
                </NearObjectsChart>
            </React.Fragment>
        );
    }
}
 
export default NearObjects;