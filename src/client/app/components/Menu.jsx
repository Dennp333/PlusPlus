import React from 'react'
import './menu.css'
import Select from './Select'
import {languages, themes, indents} from '../../utils/constants'

const Menu = ({language, handleLanguageChange, indent, handleIndentChange, theme, handleThemeChange}) => {
    return <div id = "menu">
        <Select
            value = {language}
            setValue = {handleLanguageChange}
            options = {languages}
            title = "Language:"
        />
        <Select
            value = {indent}
            setValue = {handleIndentChange}
            options = {indents}
            title = "Indentation:"
        />
        <Select
            value = {theme}
            setValue = {handleThemeChange}
            options = {themes}
            title = "Theme:"
        />
    </div>
}

export default Menu