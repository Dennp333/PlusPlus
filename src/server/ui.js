export const onOpen = () => {
  const menu = DocumentApp.getUi()
    .createMenu('The Best IDE')
    .addItem('Insert Code', 'openDialog');

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
    .setWidth(600)
    .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, 'Code Editor');
};
