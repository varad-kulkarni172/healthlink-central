    // client/src/components/DataChart.js
    import React from 'react';
    import { Line } from 'react-chartjs-2';

    const DataChart = ({ data }) => {
        const chartData = {
            labels: data.map(d => d.date),
            datasets: [
                {
                    label: 'Health Data',
                    data: data.map(d => d.value),
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                }
            ]
        };

        return <Line data={chartData} />;
    };

    export default DataChart;