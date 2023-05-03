import React from 'react'
import './select.css'

// Lets use the same colour scheme as the cancel button from chrome chan for the selects
// And maybe my resume gray for the titles
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