before(() => {
    cy.fixture('carritoDeCompras').then(function (datos) {
        this.datos = datos
    })
})