import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Colors from "../../utils/colors";

class ObjectiveChart extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width={700}>
                <LineChart
                    height={310}
                    data={this.props.data}
                    margin={{top: 5, right: 80, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis/>
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke={Colors.purple} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

ObjectiveChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ObjectiveChart;
