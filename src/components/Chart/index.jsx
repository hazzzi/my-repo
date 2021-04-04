import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import PropTypes from 'prop-types'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Chart = ({ dataKey, nameKey, data }) => {
    return (
        <ResponsiveContainer width="99%" height={250}>
            <PieChart>
                <Pie
                    dataKey={dataKey}
                    nameKey={nameKey}
                    data={data}
                    label={({ name, value }) => `${name}(${value})`}
                    outerRadius={60}
                    fill="#8884d8"
                    isAnimationActive={false}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]}></Cell>
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

Chart.propTypes = {
    dataKey: PropTypes.string,
    nameKey: PropTypes.string,
    data: PropTypes.array.isRequired,
}

Chart.defaultProps = {
    dataKey: '',
    nameKey: '',
}

export default Chart
