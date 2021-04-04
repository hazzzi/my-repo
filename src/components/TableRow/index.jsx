import styled from 'styled-components'
import PropTypes from 'prop-types'

const TableRow = styled.tr`
    color: inherit;
    display: table-row;
    outline: 0;
    vertical-align: middle;

    &: hover {
        background-color: ${props => props.hover && '#ddd'};
        cursor: ${props => props.hover && 'pointer'};
    }
`

TableRow.propTypes = {
    hover: PropTypes.any,
}

export default TableRow
