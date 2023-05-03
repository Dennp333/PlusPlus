import React from 'react'
import './select.css'

const Select = ({value, setValue, options, title}) => {
    return (
        <div>
            {title}
            <select 
                value = {value}
                onChange = {(event) => {setValue(event.target.value)}}
            >
                {Object.keys(options).map(option => <option value = {options[option]}>{option}</option>)}
            </select>
        </div>
    )
}

export default Select