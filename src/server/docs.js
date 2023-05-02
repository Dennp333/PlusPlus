// Todo: Deal with partial selections

export const getSelectedText = () => {
    let selection = DocumentApp.getActiveDocument().getSelection()
    let text = ""
    if (selection) {
        let elements = selection.getRangeElements()
        if (elements.length === 1) {
            let start = elements[0].getStartOffset()
            let end = elements[0].getEndOffsetInclusive()
            let current = elements[0].getElement().asText().getText()

            start = start < 0 ? 0 : start
            end = end < 0 ? current.length : end
            text = current.slice(start, end + 1)
        } else {
            let firstElement = elements[0].getElement().asText().getText()
            let start = elements[0].getStartOffset()
            start = start < 0 ? 0 : start

            let lastElement = elements[elements.length - 1].getElement().asText().getText()
            let end = elements[elements.length - 1].getEndOffsetInclusive()
            end = end < 0 ? lastElement.length : end

            text += firstElement.slice(start)
            text += "\n"
            for (let i = 1; i < elements.length - 1; i++) {
                text += elements[i].getElement().asText().getText()
                text += "\n"
            }
            text += lastElement.slice(0, end + 1)
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
    } else {
        let cursor = DocumentApp.getActiveDocument().getCursor()
        if (cursor) {
            let element = cursor.insertText(text)
            if (!element) {
                throw "Cannot insert code here"
            }
        } else {
            throw "Position to insert code not specified"
        }
    }
}