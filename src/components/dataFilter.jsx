import React, { Component } from 'react';
/*
    Nidhal AROURI
    24/11/2019
*/
// ------- Data Filter
class DataFilter extends Component {
    capitalizeFLetter(str) {    
        return str.charAt(0).toUpperCase() + 
         str.slice(1); 
    } 
    render() { 
        return (
            <React.Fragment>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="search" 
                        onKeyUp={
                            (event) => this.props.onFilter(
                                this.capitalizeFLetter(event.target.value)
                            )
                        }/>
                    <label htmlFor="exampleFormControlSelect1">Select orbiting object</label>
                    <select 
                        className="form-control" 
                        id="exampleFormControlSelect1"
                        defaultValue = "Select"
                        onChange={(event) => this.props.onFilter(
                            this.capitalizeFLetter(event.target.value)
                        )}
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