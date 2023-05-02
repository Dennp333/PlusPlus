// Todo: Deal with partial selections
import {closeDialog} from './ui'

export const getSelectedText = () => {
    let selection = DocumentApp.getActiveDocument().getSelection()
    let text = ""
    if (selection) {
        let elements = selection.getRangeElements()
        for (let i = 0; i < elements.length; i++) {
            text += elements[i].getElement().asText().getText()
        }
    }
    return text
}

export const insertOrReplaceText = (text) => {
    let selection = DocumentApp.getActiveDocument().getSelection()
    if (selection) {
        let elements = selection.getRangeElements()
        elements[0].getElement().asText().setText(text)
        for (let i = 1; i < elements.length; i++) {
            elements[i].getElement().removeFromParent()
        }
        closeDialog()
    } else {
        let cursor = DocumentApp.getActiveDocument().getCursor()
        if (cursor) {
            let element = cursor.insertText(text)
            if (!element) {
                throw "Cannot insert code here"
            }
            closeDialog()
        } else {
            throw "Position to insert code not specified"
        }
    }
}