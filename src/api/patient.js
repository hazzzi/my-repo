const API_URL = 'http://49.50.167.136:9871/api'

// 환자 목록 조회
export const patientList = async ({ page, length, orderColumn, orderDesc, gender, race, ethnicity, death }) => {
    let url = `${API_URL}/patient/list?page=${page}&length=${length}`

    if (orderColumn) url = `${url}&order_column=${orderColumn}&order_desc=${orderDesc}`
    if (gender) url = `${url}&gender=${gender}`
    if (race) url = `${url}&race=${race}`
    if (ethnicity) url = `${url}&ethnicity=${ethnicity}`
    if (death) url = `${url}&death=${death === 'Y' ? true : false}`

    const request = await fetch(url)
    return await request.json()
}

// 성별 목록 조회
export const genderList = async () => {
    const request = await fetch(`${API_URL}/gender/list`)
    return await request.json()
}

// 인종 목록 조회
export const raceList = async () => {
    const request = await fetch(`${API_URL}/race/list`)
    return await request.json()
}

// 민족 목록 조회
export const ethnicityList = async () => {
    const request = await fetch(`${API_URL}/ethnicity/list`)
    return await request.json()
}

// 환자 상세 정보 요약
export const patientBrief = async personID => {
    const request = await fetch(`${API_URL}/patient/brief/${personID}`)
    return await request.json()
}

// 성별+인종+민족별 환자 수 통계
export const patientStats = async () => {
    const request = await fetch(`${API_URL}/patient/stats`)
    return await request.json()
}
