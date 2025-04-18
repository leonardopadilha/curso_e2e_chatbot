Cypress.Commands.add('abrirChatBot', () => {
  cy.viewport("iphone-xr");
  cy.visit("/");

  cy.get('button[aria-label="Open Chat"]')
      .should("be.visible")
      .click();

  cy.get('.rcb-chat-header span')
      .should('be.visible')
      .and('have.text', 'Sensei')
})

Cypress.Commands.add('verificarMensagem', (mensagemEsperada, timeout = 4000) => {
  cy.contains(".rcb-bot-message", mensagemEsperada, { timeout: timeout })
  .should("be.visible");
})

Cypress.Commands.add('selecionarOpcao', (opcaoSelecionada) => {
  cy.contains('.rcb-options', opcaoSelecionada)
  .should('be.visible')
  .click()
})

Cypress.Commands.add('enviarMensagem', (mensagem) => {
  cy.get('textarea[placeholder^="Escreva sua mensagem"]')
  .type(mensagem)

cy.get('.rcb-send-button')
  .click()
})
