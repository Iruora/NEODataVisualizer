import React, { Component } from 'react';
import Chart from 'react-google-charts';

/* 
    Nidhal AROURI 
    24/11/2019
    Botify/
*/
// ------------NEO Bar Chart--------------
class NearObjectsChart extends Component {
    
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
                        this.props.visuData
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