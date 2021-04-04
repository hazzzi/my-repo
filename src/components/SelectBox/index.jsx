import styled from 'styled-components'
import PropTypes from 'prop-types'

const Select = styled.select`
    margin: 8px;
    flex-shrink: 0;
`

const SelectBox = ({ value, optionList, placeholder, onChange }) => {
    return (
        <Select value={value} onChange={onChange}>
            <option value="" disabled>
                {placeholder}
            </option>
            <option value="all">all</option>
            {optionList.map(value => (
                <option value={value} key={value}>
                    {value}
                </option>
            ))}
        </Select>
    )
}

SelectBox.propTypes = {
    value: PropTypes.string.isRequired,
    optionList: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

SelectBox.defaultProps = {
    value: '',
    optionList: [],
}

export default SelectBox
