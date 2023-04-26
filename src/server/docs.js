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