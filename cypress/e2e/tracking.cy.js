/// <reference types="cypress" />

describe("Consulta de Encomenda no Chat", () => {
  it("Deve indicar que a encomenda já foi entregue", () => {

    cy.abrirChatBot()

    const trackingCode = "PD123456785BR";

    cy.verificarMensagem("Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?")   
    cy.selecionarOpcao('Sim, por favor!')
    cy.verificarMensagem('Ótimo! Por favor, digite o código de rastreio da sua encomenda:')
    cy.enviarMensagem(trackingCode)
    cy.verificarMensagem(`Confirmando: você informou o código de rastreio ${trackingCode}. Está tudo certo?`)
    cy.selecionarOpcao('Sim, está certo!')
    cy.verificarMensagem('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍')
    cy.verificarMensagem(
      'Boa notícia! Sua encomenda já foi entregue com sucesso. 🎉 Se precisar de algo mais, é só me chamar!', 7000);
  });
})

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
