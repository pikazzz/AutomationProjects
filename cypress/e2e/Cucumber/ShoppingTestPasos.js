import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import AddressPage from '../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../support/PageObjects/AuthenticationPage'
import HomePage from '../../support/PageObjects/homePage'
import PaymentPage from '../../support/PageObjects/PaymentPage'
import ShippingPage from '../../support/PageObjects/ShippingPage'
import ShoppingSummaryCartPage from '../../support/PageObjects/ShoppingCartSummaryPage'
 
const homePage = new HomePage()
const shoppingSummaryCartPage = new ShoppingSummaryCartPage()
const authenticationPage = new AuthenticationPage()
const addressPage = new AddressPage()
const shippingPage = new ShippingPage()
const paymentPage = new PaymentPage()
 
Given('el usuario se encuentra en la pagina de compra', () => {
    // ingresamos a la pagina	 
    cy.visit("http://automationpractice.com/index.php")
})
 
And('busca un articulo llamado blusa', () => {
    homePage.getSearchBoxInput().type('Blouse')
    homePage.getSearchBoxButton().click()
})
 
And('agrega una blusa al carrito', () => {
    homePage.getAddToCardElementButton("Blouse").click()
    homePage.getProceedToCheckoutButton().click()
})
 
Then('el valor del articulo es de 27.00 dolares', () => {
    shoppingSummaryCartPage.getProductNameText().should('contain.text', 'Blouse')
    shoppingSummaryCartPage.getProductPriceText().should('contain.text', '27.00')
})
 
 
When('finaliza la compra de los articulos', () => {
    shoppingSummaryCartPage.getProceedToCheckoutButton().click()
 
    authenticationPage.getEmailAddressInput().type('cypress@ateneaconocimientos.net')
    authenticationPage.getPasswordInput().type('Atenea')
    authenticationPage.getSignInButton().click()
 
    addressPage.getProceedToCheckoutButton().click()
 
    shippingPage.getTermsOfServiceCheckbox().check().should('be.checked')
    shippingPage.getProceedToCheckoutButton().click()
 
    paymentPage.getPayByBankWireOptionButton().click()
    paymentPage.getIConfirmMyOrderButton().click()
})