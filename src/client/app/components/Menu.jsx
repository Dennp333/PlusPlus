import React from 'react'
import './menu.css'
import Setting from './Setting'
import {languages, themes, indents} from '../../utils/constants'

const Menu = ({language, handleLanguageChange, indent, handleIndentChange, theme, handleThemeChange}) => {
    return <div id = "menu">
        <Setting
            value = {language}
            setValue = {handleLanguageChange}
            options = {languages}
            label = "Language"
        />
        <Setting
            value = {indent}
            setValue = {handleIndentChange}
            options = {indents}
            label = "Indentation"
        />
        <Setting
            value = {theme}
            setValue = {handleThemeChange}
            options = {themes}
            label = "Theme"
        />
    </div>
}

export default Menu