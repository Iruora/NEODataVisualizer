import React, { Component } from 'react';
/*
    Nidhal AROURI
    24/11/2019
*/
// ------- Data Filter
class DataFilter extends Component {
    state = {  }
    render() { 
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Select orbiting object</label>
                    <select 
                        className="form-control" 
                        id="exampleFormControlSelect1"
                        defaultValue = "Select"
                    >
                        <option disabled>Select</option>
                        <option>Earth</option>
                        <option>Mars</option>
                    </select>
                </div>
            </React.Fragment>
        );
    }
}
 
export default DataFilter;