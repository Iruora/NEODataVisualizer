import React, { Component } from 'react';
/*
    Nidhal AROURI
    25/11/2019
*/
// ------ Table for data visualization
class DataTable extends Component {
    index = 0; // attrubute to refer rows index
    render() { 
        this.index = 0;
        return ( 
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Max</th>
                        <th scope="col">Min</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.visuData.slice(1).map(
                            e => {
                                this.index++;
                                return (
                                <tr key={e[0]}>
                                    <td>{this.index}</td>
                                    <td>{e[0]}</td>
                                    <td>{e[1]}</td>
                                    <td>{e[2]}</td>
                                </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
        );
    }
}
export default DataTable;