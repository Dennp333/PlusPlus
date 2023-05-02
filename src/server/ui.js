export const onOpen = () => {
  const menu = DocumentApp.getUi()
    .createMenu('The Best IDE')
    .addItem('Insert Code', 'openDialog')

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('app')
    .setWidth(750)
    .setHeight(750);
  DocumentApp.getUi().showModalDialog(html, 'Code Editor')
};

export const closeDialog = () => {
  const output = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>')
    .setWidth(750)
    .setHeight(750)
  DocumentApp.getUi().showModalDialog(output, 'Saving...')
}
