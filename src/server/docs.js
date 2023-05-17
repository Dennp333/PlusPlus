export const getSelectedText = () => {
    let selection = DocumentApp.getActiveDocument().getSelection()
    let text = ""
    if (selection) {
        let elements = selection.getRangeElements()

        let firstElement = elements[0].getElement().asText()
        let firstText = firstElement.getText()
        let start = elements[0].getStartOffset()
        start = start < 0 ? 0 : start

        let lastElement = elements[elements.length - 1].getElement().asText()
        let lastText = lastElement.getText()
        let end = elements[elements.length - 1].getEndOffsetInclusive()
        end = end < 0 ? lastText.length : end

        if (elements.length === 1) {
            text = firstText.slice(start, end + 1)
        } else {
            text += firstText.slice(start)
            text += "\n"
            for (let i = 1; i < elements.length - 1; i++) {
                text += elements[i].getElement().asText().getText()
                text += "\n"
            }
            text += lastText.slice(0, end + 1)
        }
    }
    return text
}

export const insertOrReplaceText = (text) => {
    let document = DocumentApp.getActiveDocument()
    let selection = document.getSelection()
    if (selection) {
        let elements = selection.getRangeElements()

        let firstElement = elements[0].getElement().asText()
        let firstText = firstElement.getText()
        let start = elements[0].getStartOffset()
        start = start < 0 ? 0 : start

        let lastElement = elements[elements.length - 1].getElement().asText()
        let end = elements[elements.length - 1].getEndOffsetInclusive()

        if (elements.length === 1) {
            let res = ""
            res += firstText.slice(0, start)
            res += text
            if (end >= 0) {
                res += firstText.slice(end + 1)
            }
            let success = firstElement.setText(res)
            if (!success) {
                throw "Cannot insert code here"
            }
        } else {
            let success = firstElement.setText(firstText.slice(0, start) + text)
            if (!success) {
                throw "Cannot insert code here"
            }
            for (let i = 1; i < elements.length - 1; i++) {
                elements[i].getElement().removeFromParent()
            }
            if (end >= 0) {
                lastElement.deleteText(0, end)
            } else {
                lastElement.setText("")
            }
        }
    } else {
        let cursor = document.getCursor()
        if (cursor) {
            let success = cursor.insertText(text)
            if (!success) {
                throw "Cannot insert code here"
            }
        } else {
            throw "Position to insert code not specified"
        }
    }
}