import { useEffect, useState } from 'react'
import api from 'src/api'
import { Container, Pagination, Table, TableBody, TableData, TableHead, TableRow } from 'src/components'
import Filter from './components/Filter'
import PatientTableHeader from './components/PatientTableHeader'
import PatientTableRow from './components/PatientTableRow'
import PatientChart from './components/PatientChart'

export default function Main() {
    const [patientPagerData, setPatientPagerData] = useState()
    const [searchParam, setSearchParam] = useState({ page: 1, length: 5 })

    // 페이지 버튼 클릭
    const _handleClickPageButton = page => {
        setSearchParam({ ...searchParam, page })
    }

    // 페이지당 row 갯수 변경
    const _handleChangeRow = length => {
        setSearchParam({ ...searchParam, length })
    }

    // 정렬 순서 변경
    const _handleChangeOrder = ({ orderColumn, orderDesc }) => {
        setSearchParam({ ...searchParam, orderColumn, orderDesc })
    }

    // 필터 조건 변경
    const _handleChangeFilter = (key, value) => {
        if (key === 'age') {
            const [ageMin, ageMax] = value || []
            setSearchParam({ ...searchParam, ageMin, ageMax })
        } else {
            setSearchParam({ ...searchParam, [key]: value })
        }
    }

    // 환자 데이터 조회
    const reloadData = async ({ searchParam }) => {
        try {
            const { patient } = await api.patientList(searchParam)
            setPatientPagerData(patient)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        reloadData({ searchParam })
    }, [searchParam])

    const { list: patientList = [], page, totalLength } = patientPagerData || {}
    const { length, orderColumn, orderDesc } = searchParam

    return (
        <Container>
            <h2>환자 정보</h2>
            <hr />
            {patientList.length > 0 && (
                <>
                    <PatientChart searchParam={searchParam} />
                    <hr />
                </>
            )}
            <Filter onChangeFilter={_handleChangeFilter} searchParam={searchParam} />
            <Table>
                <TableHead>
                    <PatientTableHeader
                        orderColumn={orderColumn}
                        orderDesc={orderDesc}
                        onChangeOrder={_handleChangeOrder}
                    />
                </TableHead>
                <TableBody>
                    {patientList.length === 0 && (
                        <TableRow>
                            <TableData colSpan={7}>데이터가 존재하지 않습니다.</TableData>
                        </TableRow>
                    )}
                    {patientList.map(patient => (
                        <PatientTableRow key={patient.personID} {...patient} />
                    ))}
                </TableBody>
            </Table>
            <Pagination
                page={page ?? 0}
                length={length}
                total={totalLength ?? 0}
                onClick={_handleClickPageButton}
                onChangeRow={_handleChangeRow}
            />
        </Container>
    )
}
