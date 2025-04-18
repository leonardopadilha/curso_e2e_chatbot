/// <reference types="cypress" />

describe("Consulta de Encomenda no Chat", () => {
  beforeEach(() => {
    cy.abrirChatBot()

    cy.verificarMensagem("Olá! Tudo bem? Posso te ajudar a consultar o status da sua encomenda?")   
    cy.selecionarOpcao('Sim, por favor!')
    cy.verificarMensagem('Ótimo! Por favor, digite o código de rastreio da sua encomenda:')
  })

  const cenarios = [
    { titulo: 'Deve indicar que a encomenda já foi entregue', codigoRastreio: 'PD123456785BR', mensagemEsperada: 'Boa notícia! Sua encomenda já foi entregue com sucesso. 🎉 Se precisar de algo mais, é só me chamar!'},
    { titulo: 'Deve indicar que a encomenda está a caminho', codigoRastreio: 'BR987654321BR', mensagemEsperada: 'A sua encomenda já foi despachada e está a caminho! 🚚 Prazo estimado: 5 dias úteis' },
    { titulo: 'Deve indicar que a encomenda está em rota de entrega', codigoRastreio: 'QW112233445BR', mensagemEsperada: 'Ótima notícia! Sua encomenda está em rota de entrega e chega ainda hoje. Fique de olho! 👀📦'}
  ]

  cenarios.forEach(function(cenario) {
    it(cenario.titulo, () => {
      cy.enviarMensagem(cenario.codigoRastreio)
      cy.verificarMensagem(`Confirmando: você informou o código de rastreio ${cenario.codigoRastreio}. Está tudo certo?`)
      cy.selecionarOpcao('Sim, está certo!')
      cy.verificarMensagem('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍')
      cy.verificarMensagem(cenario.mensagemEsperada, 7000);
    });
  })

  it("Deve exibir erro para o código de rastreio não encontrado", () => {
    const trackingCode = "AB123456789XY";
    cy.enviarMensagem(trackingCode)
    cy.verificarMensagem(`Confirmando: você informou o código de rastreio ${trackingCode}. Está tudo certo?`)
    cy.selecionarOpcao('Sim, está certo!')
    cy.verificarMensagem('Perfeito! Estou consultando as informações nos Correios... Só um instante. 📦🔍')
    cy.verificarMensagem(
      'Hmm... Não encontrei uma encomenda com os dados informados. Vamos tentar de novo?', 7000);
    cy.selecionarOpcao('Encerrar atendimento')
    cy.verificarMensagem(
        'Obrigado por falar comigo! 😊 Se precisar de mais alguma coisa, é só chamar.');
  });
})