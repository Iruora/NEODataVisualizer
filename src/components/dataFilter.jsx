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
                        onChange={(event) => this.props.onFilter(event.target.value)}
                    >
                        <option disabled>Select</option>
                        <option>Mercury</option>
                        <option>Earth</option>
                        <option>Venus</option>
                        <option>Mars</option>
                        <option>Jupiter</option>
                        <option>Saturn</option>
                        <option>Uranus</option>
                        <option>Neptun</option>
                    </select>
                </div>
                <h2>
                    {this.props.selectedOrbitingObj ? `Filtered By ${this.props.selectedOrbitingObj}` : ''}
                </h2>
            </React.Fragment>
        );
    }
}
 
export default DataFilter;