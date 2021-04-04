import React, { useEffect, useState } from 'react'
import { TableHeadCell, TableRow } from 'src/components'

const PatientTableHeader = ({ orderColumn, orderDesc, onChangeOrder }) => {
    const [orderState, setOrderState] = useState({ column: '', desc: null })

    const columnHeads = [
        { key: 'person_id', value: '환자ID' },
        { key: 'gender', value: '성별' },
        { key: 'birth', value: '생년월일' },
        { key: 'age', value: '나이' },
        { key: 'ethnicity', value: '인종' },
        { key: 'race', value: '민족' },
        { key: 'death', value: '사망 여부' },
    ]

    const _handleClickOrder = key => {
        if (key === 'age') {
            return
        }

        if ((column === key) & desc) {
            setOrderState({ column: '', desc: null })
            onChangeOrder({ orderColumn: '', orderDesc: null })
            return
        }

        if ((column === key) & !desc) {
            setOrderState({ column: key, desc: true })
            onChangeOrder({ orderColumn: key, orderDesc: true })
            return
        }

        setOrderState({ column: key, desc: false })
        onChangeOrder({ orderColumn: key, orderDesc: false })
    }

    useEffect(() => {
        setOrderState({ column: orderColumn, desc: orderDesc })
    }, [])

    const { column, desc } = orderState

    return (
        <TableRow>
            {columnHeads.map(({ key, value }) => (
                <TableHeadCell key={key} onClick={() => _handleClickOrder(key)}>
                    {value}
                    {column === key && (desc ? `▼` : '▲')}
                </TableHeadCell>
            ))}
        </TableRow>
    )
}

PatientTableHeader.propTypes = {}

export default PatientTableHeader
