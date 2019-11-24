import React, { Component } from 'react';
class DataTable extends Component {
    mapToTable(array) {
        const data = array;
        data.shift();
        return data;
    }
    render() { 
        console.log(this.props.visuData);
        return ( 
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Max</th>
                        <th scope="col">Min</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.visuData.slice(1).map(
                            e => <tr key={e[0]}>
                                    <td>{e[0]}</td>
                                    <td>{e[1]}</td>
                                    <td>{e[2]}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }
}
export default DataTable;
