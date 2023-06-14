export const onOpen = () => {
  const menu = DocumentApp.getUi()
    .createMenu('PlusPlus')
    .addItem('Insert Code', 'openDialog')

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('app')
    .setWidth(700)
    .setHeight(750);
  DocumentApp.getUi().showModalDialog(html, 'PlusPlus')
};

export const closeDialog = (title) => {
  const output = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>')
    .setWidth(700)
    .setHeight(750)
  DocumentApp.getUi().showModalDialog(output, title)
}
