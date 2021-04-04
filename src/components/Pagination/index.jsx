import styled from 'styled-components'
import PropTypes from 'prop-types'

const PageContainer = styled.div`
    padding-right: 2px;
    display: flex;
    justify-content: flex-end;
`

const Select = styled.select`
    flex-shrink: 0;
    margin: 16px;
`
const Typography = styled.p`
    flex-shrink: 0;
`
const ButtonGroup = styled.div`
    flex-shrink: 0;
    margin: 16px;
`
const Pagination = ({ page, length, total, onClick, onChangeRow }) => {
    const totalPage = Math.ceil(total / length)

    // 다음 페이지
    const _handleNextPage = () => {
        if (page >= totalPage) {
            return
        }
        onClick(page + 1)
    }

    // 이전 페이지
    const _handlePrevPage = () => {
        if (page <= 1) {
            return
        }
        onClick(page - 1)
    }

    const _handleChangeRows = e => {
        onChangeRow(e.target.value)
    }

    return (
        <PageContainer>
            <Typography>Rows per page:</Typography>
            <Select value={length} onChange={_handleChangeRows}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
            </Select>
            <Typography>
                {page ?? 0} of {totalPage ?? 0}
            </Typography>
            <ButtonGroup>
                <button onClick={_handlePrevPage}>{`<`}</button>
                <button onClick={_handleNextPage}>{`>`}</button>
            </ButtonGroup>
        </PageContainer>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    onChangeRow: PropTypes.func.isRequired,
}

export default Pagination
