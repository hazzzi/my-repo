import { useState } from 'react'
import api from 'src/api'
import { TableData, TableRow } from 'src/components'

const PatientTableRow = ({ age, birthDatetime, ethnicity, gender, isDeath, personID, race }) => {
    const [open, setOpen] = useState(false)
    const [briefData, setBriefData] = useState({})

    const _handleClickPatient = async () => {
        try {
            if (!open) {
                const briefData = await api.patientBrief(personID)
                setBriefData(briefData)
            }

            setOpen(!open)
        } catch (err) {
            console.log(err.message)
        }
    }

    const { conditionList, visitCount } = briefData

    const birthDate = birthDatetime.substr(0, 10)

    return (
        <>
            <TableRow hover onClick={_handleClickPatient}>
                <TableData>{personID}</TableData>
                <TableData>{gender}</TableData>
                <TableData>{birthDate}</TableData>
                <TableData>{age}</TableData>
                <TableData>{ethnicity}</TableData>
                <TableData>{race}</TableData>
                <TableData>{isDeath ? 'Y' : 'N'}</TableData>
            </TableRow>
            {open && (
                <TableRow>
                    <TableData colSpan={7}>
                        <div>
                            <p>방문횟수: {visitCount}</p>
                            {conditionList.map(condition => (
                                <p>{condition}</p>
                            ))}
                        </div>
                    </TableData>
                </TableRow>
            )}
        </>
    )
}

export default PatientTableRow
