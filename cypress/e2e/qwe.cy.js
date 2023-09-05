// <reference types="Cypress" />
//Suite de casos que contiene cada caso 
describe('Primer conjunto de casos de prueba', function () {
    beforeEach(() => {
        // ingresamos a la pagina    
        cy.visit("http://automationpractice.com/index.php")
    })


    //Caso de prueba 1  
    it('Contabilizar la cantidad de elementos en la seccion de pagina principal', function () {

        //Verificar la cantidad de elementos visibles   
        cy.get('#homefeatured .product-container').should('have.length', 7)
        //Obtenemos el elemento homefeatured .product-container como un parametro   
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
        //Verificamos nuevamente la cantidad de elementos utilizando el parametro   
        cy.get('@ProductosPopulares').should('have.length', 7)
    })

    //Caso de prueba 2  
    it('Agregar el elemento de tipo "Printed Dress" al carrito de compra desde la pagina principal', function () {
        //Obtenemos el elemento homefeatured .product-container como un parametro   
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
        //Iteramos para encontrar un producto con nombre X  
        cy.get('@ProductosPopulares')
            .find('.product-name')
            .each(($el, index, $list) => {

                cy.get('@ProductosPopulares').eq(index).find('.price').then(function ($el1) {
                    let precio = $el1.text()
                    cy.log(precio)

                    if ($el.attr('title') === 'Printed Dress' && precio.includes('50.99')) {
                        cy.log('Se ha encontrado el elemento buscado')
                        cy.log('Se ha encontrado el precio buscado')
                        cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
                    }
                })

            })
        cy.get('h2 > .ajax_cart_product_txt')
            .should('contain.text', 'There is 1 item in your cart.')
            .should('be.visible')
    })
    //Caso de prueba 3  
    it('Verificamos que el drop down de women, tenga los elementos necesarios', function () {

        //Flotamos sobre un elemento
        cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke('attr', 'style', 'display: block')
        cy.get('a[title="Tops"]').should('be.visible')
        cy.get('a[title="T-shirts"]').should('be.visible')
        cy.get('a[title="Blouses"]').should('be.visible')
        cy.get('a[title="Dresses"]').should('be.visible')
        cy.get('a[title^="Casual"]').should('be.visible')
        cy.get('a[title^="Evening"]').should('be.visible')
        cy.get('a[title^="Summer"]').should('be.visible')
    })
    //caso 4
    it('Verificar que los checkboxes estan funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input').check().should('be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-evening_dresses"]) input').should('not.be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input').should('not.be.checked')
    })
    it('Verificar que los dropdowns de arreglo esten funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value', 'name:asc')
    })
    //caso 5
    it('Verificar que los dropdowns de arreglo esten funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value', 'name:asc')
    })


    //caso6
    it('Crear una compra desde cero', function () {
        cy.get('#search_query_top').type('Blouse')
        cy.get('#searchbox > .btn').click()
        cy.get('.product-container:has(.product-name[title="Blouse"]) .ajax_add_to_cart_button').click()
        cy.get('.button-medium[title="Proceed to checkout"]').click()

        cy.get('tr[id^=product]').find('.product-name > a').should('contain.text', 'Blouse')
        cy.get('tr[id^=product]').find('.price').should('contain.text', '27.00')
        cy.get('.cart_navigation > .button').click()
        cy.get('#email').type('ivanbratko@cypress.net')
        cy.get('#passwd').type('qwerty')
        cy.get('#SubmitLogin').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('#cgv').check().should('be.checked')
        cy.get('.cart_navigation > .button').click()
        cy.get('.bankwire').click()
        cy.get('.cart_navigation > .button').click()
        cy.get('.cheque-indent > .dark').should('contain.text', 'Your order on My Store is complete.')
    })
})

//Caso 7
it('Lleanmos nuestro primer formulario utilizando data', function () {
    cy.get('#firstName').type(this.datos.nombre)
    cy.get('#lastName').type(this.datos.apellido)
    cy.get('#userEmail').type(this.datos.email)
    cy.get('input[name="gender"][value="' + this.datos.sexo + '"]').check({ force: true }).should('be.checked')
    cy.get('#userNumber').type(this.datos.telefono)
    cy.get('#dateOfBirthInput').click()
    cy.get('.react-datepicker__month-select').should('be.visible').select(this.datos.fechaDeNacimiento[0])
    cy.get('.react-datepicker__year-select').should('be.visible').select(this.datos.fechaDeNacimiento[1])
    cy.get('.react-datepicker__day--0' + this.datos.fechaDeNacimiento[2]).should('be.visible').click()
    cy.get('#dateOfBirthInput')
        .should('contain.value', this.datos.fechaDeNacimiento[0].substring(0, 3))
        .should('contain.value', this.datos.fechaDeNacimiento[1])
        .should('contain.value', this.datos.fechaDeNacimiento[2])
    cy.get('.subjects-auto-complete__value-container').type(this.datos.materia)
    cy.get('div[id^="react-select-"]').click()
    cy.get('.subjects-auto-complete__value-container').should('contain.text', this.datos.materia)
    cy.get("div[class='custom-control custom-checkbox custom-control-inline']:has(label:contains('" + this.datos.hobbies[0] + "')) input").check({ force: true }).should('be.checked')
    cy.get("div[class='custom-control custom-checkbox custom-control-inline']:has(label:contains('" + this.datos.hobbies[1] + "')) input").check({ force: true }).should('be.checked')

    cy.get('#uploadPicture').then(function ($el) {
        //convertir la imagen en un string de base64
        const blob = Cypress.Blob.base64StringToBlob(this.imagen, 'image/png')

        const file = new File([blob], this.datos.imagen, { type: 'image/png' })
        const list = new DataTransfer()

        list.items.add(file)
        const myFileList = list.files

        $el[0].files = myFileList
        $el[0].dispatchEvent(new Event('change', { bubbles: true }))
    })

    cy.get('#currentAddress').type(this.datos.direccion)
    cy.get('#state').click().find("div:contains('" + this.datos.estado + "')[id*='react-select']").should('be.visible').click()
    cy.get('#city').click().find("div:contains('" + this.datos.ciudad + "')[id*='react-select']").should('be.visible').click()
    cy.get('#submit').click()

    //Aserciones

    cy.get('#example-modal-sizes-title-lg')
        .should('have.text', 'Thanks for submitting the form')

    cy.get('td:contains(Student Name) +td')
        .should('have.text', this.datos.nombre + " " + this.datos.apellido)

    cy.get('td:contains(Student Email) +td')
        .should('have.text', this.datos.email)

    cy.get('td:contains(Gender) +td')
        .should('have.text', this.datos.sexo)


    cy.get('td:contains(Mobile) +td')
        .should('have.text', this.datos.telefono)


    cy.get('td:contains(Date of Birth) +td')
        .should('have.text', this.datos.fechaDeNacimiento[2] + " "
            + this.datos.fechaDeNacimiento[0] + ","
            + this.datos.fechaDeNacimiento[1])


    cy.get('td:contains(Subjects) +td')
        .should('have.text', this.datos.materia)


    cy.get('td:contains(Hobbies) +td')
        .should('have.text', this.datos.hobbies[0] + ", " + this.datos.hobbies[1])


    cy.get('td:contains(Picture) +td')
        .should('have.text', this.datos.imagen)


    cy.get('td:contains(Address) +td')
        .should('have.text', this.datos.direccion)


    cy.get('td:contains(State and City) +td')
        .should('have.text', this.datos.estado + " " + this.datos.ciudad)
})



