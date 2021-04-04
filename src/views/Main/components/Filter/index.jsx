import React, { useEffect, useState } from 'react'
import api from 'src/api'
import { SelectBox } from 'src/components'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Box = styled.div`
    display: inline-flex;
`

const Input = styled.input`
    width: 4rem;
    margin: 0 4px;
`

const Filter = ({ searchParam, onChangeFilter }) => {
    const [filterData, setfilterData] = useState({})

    // 테이블 필터 데이터 조회
    const reloadData = async () => {
        try {
            const { genderList } = await api.genderList()
            const { raceList } = await api.raceList()
            const { ethnicityList } = await api.ethnicityList()
            setfilterData({ genderList, raceList, ethnicityList })
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        reloadData()
    }, [])

    // 필터 조건 변경
    const _handleChangeFilter = (e, key) => {
        const value = e.target.value
        if (value === 'all') {
            onChangeFilter(key, '')
        } else {
            onChangeFilter(key, value)
        }
    }

    const { genderList, raceList, ethnicityList } = filterData
    const { gender, race, ethnicity, death, ageMin, ageMax } = searchParam

    return (
        <div>
            <h5>필터</h5>
            <SelectBox
                placeholder="성별"
                value={gender}
                optionList={genderList}
                onChange={e => _handleChangeFilter(e, 'gender')}
            />
            <SelectBox
                placeholder="인종"
                value={race}
                optionList={raceList}
                onChange={e => _handleChangeFilter(e, 'race')}
            />
            <SelectBox
                placeholder="민족"
                value={ethnicity}
                optionList={ethnicityList}
                onChange={e => _handleChangeFilter(e, 'ethnicity')}
            />
            <SelectBox
                placeholder="사망 여부"
                value={death}
                optionList={['Y', 'N']}
                onChange={e => _handleChangeFilter(e, 'death')}
            />
            <Box>
                {/* 나이 조건 조회 미구현 */}
                <label>나이</label>
                <Input type="text" name="start" value={ageMin} />~
                <Input type="text" name="end" value={ageMax} />
            </Box>
        </div>
    )
}

Filter.propTypes = {
    searchParam: PropTypes.object.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
}

Filter.defaultProps = {
    searchParam: {},
}

export default Filter
