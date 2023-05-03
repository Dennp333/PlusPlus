import React, { useState } from 'react'
import './menu.css'
import Select from './Select'
import {languages, themes, indents} from '../../utils/constants'

const Menu = ({language, setLanguage, indent, setIndent, theme, setTheme}) => {
    const [open, setOpen] = useState(false)
    return <div id = "menu">
        <Select
            value = {language}
            setValue = {setLanguage}
            options = {languages}
            title = "Language:"
        />
        <Select
            value = {indent}
            setValue = {setIndent}
            options = {indents}
            title = "Indentation:"
        />
        <Select
            value = {theme}
            setValue = {setTheme}
            options = {themes}
            title = "Theme:"
        />
    </div>
}

export default Menu