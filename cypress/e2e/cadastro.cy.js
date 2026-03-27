/// <reference types="cypress"/>
import { faker } from '@faker-js/faker';
import cadastroPages from '../support/pages/cadastro-pages';

describe('Funcionalidade: Cadastro no Hub de leitura', () => {

    beforeEach(() => {
        cadastroPages.visitarPaginaCadastro()
    });

    it('Deve fazer cadastro com sucesso, usando função do JavaScript', () => {
        let email = `teste${Date.now()}@teste.com`
        cy.get('#name').type('Alex Mariano')
        cy.get('#email').type(email)
        cy.get('#phone').type('31987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso, usando Faker(que é uma biblioteca)', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('31987654321')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });
    it('Deve preencher cadastro com sucesso - Usando comando customizado', () => {
       let email = `teste${Date.now()}@teste.com`
       let nome = faker.person.fullName()
       cy.preencherCadastro(
        nome,
        email,
        '31987654321',
        'Teste@123',
        'Teste@123'
       ) 
       cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso  - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
        cadastroPages.preencherCadastro('Alex Mariano', email, '31987456321', 'senha123', 'senha123')
        cy.url().should('include', 'dashboard')
    });

    it.only('Deve validar mensagem ao tentar realizar cadastro sem preencher nome', () => {
        cadastroPages.preencherCadastro('', 'alexteste@teste.com', '31987456321', 'senha123', 'senha123')
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres')
    });
});