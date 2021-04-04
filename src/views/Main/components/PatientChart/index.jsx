import React, { useEffect, useState } from 'react'
import api from 'src/api'
import { Chart } from 'src/components'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

const dataPreprocessor = (data, attribute) => {
    const result = []

    data.reduce((res, value) => {
        const key = value[attribute]
        if (!res[key]) {
            res[key] = { [attribute]: key, count: 0 }
            result.push(res[key])
        }
        res[key].count += value.count
        return res
    }, [])

    return result
}

const PatientChart = ({ searchParam }) => {
    const [stats, setStats] = useState({})

    // 통계 데이터 필터링
    const statsFilter = (stats, { gender, race, ethnicity }) => {
        let result = stats
        if (gender) {
            result = result.filter(obj => obj.gender === gender)
        }
        if (race) {
            result = result.filter(obj => obj.race === race)
        }
        if (ethnicity) {
            result = result.filter(obj => obj.ethnicity === ethnicity)
        }
        return result
    }

    // 통계 데이터 조회
    const reloadData = async ({ searchParam }) => {
        try {
            const { stats } = await api.patientStats()

            const newStats = statsFilter(stats, searchParam)

            const genderData = dataPreprocessor(newStats, 'gender')
            const raceData = dataPreprocessor(newStats, 'race')
            const ethnicityData = dataPreprocessor(newStats, 'ethnicity')

            setStats({ genderData, raceData, ethnicityData })
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        reloadData({ searchParam })
    }, [searchParam])

    const { genderData, raceData, ethnicityData } = stats ?? {}

    return (
        <GridContainer>
            <div>
                <h5>성별 환자 수</h5>
                {genderData && <Chart dataKey="count" nameKey="gender" data={genderData} />}
            </div>
            <div>
                <h5>인종별 환자 수</h5>
                {raceData && <Chart dataKey="count" nameKey="race" data={raceData} />}
            </div>
            <div>
                <h5>민족별 환자 수</h5>
                {ethnicityData && <Chart dataKey="count" nameKey="ethnicity" data={ethnicityData} />}
            </div>
            {/* <div>
              (성별 + 인종)별 환자 수 미구현
              (성별 + 민족)별 환자 수 미구현
            </div> */}
        </GridContainer>
    )
}

PatientChart.propTypes = {
    searchParam: PropTypes.object,
}

PatientChart.defaultProps = {
    searchParam: {},
}

export default PatientChart
