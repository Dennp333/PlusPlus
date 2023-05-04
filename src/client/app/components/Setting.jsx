import React from 'react'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'

const Setting = ({value, setValue, options, label}) => {
    return (
        <FormControl>
            <FormHelperText
                sx = {{
                    marginLeft: "0px"
                }}
            >
                {label}
            </FormHelperText>
            <Select
                value = {value}
                onChange = {(event) => {setValue(event.target.value)}}
                variant = "standard"
                size = "small"
                sx = {{
                    minWidth: "6.5em",
                    marginRight: "16px",
                    marginBottom: "4px"
                }}
            >
                {Object.keys(options).map(option => <MenuItem value = {options[option]}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default Setting