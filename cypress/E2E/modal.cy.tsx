describe("Модальные окна", () => {
    const API_URL = "https://norma.education-services.ru/api";
    beforeEach(() => {
        cy.intercept("GET", `${API_URL}/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });

    it("Тестирование октрытия модального окна с ингредиентом", () => {
        cy.get("[data-cy=ingredient-card]").first().click();
        cy.get("[data-cy=modal-ingredient]").should("be.visible");
        cy.contains("Детали ингредиента").should("exist");
    });

    it("Тестирование закрытия модального окна с ингредиентом при клике на крестик", () => {
        cy.get("[data-cy=ingredient-card]").first().click();
        cy.get("[data-cy=modal-ingredient]").should("be.visible");
        cy.get("[data-cy=modal-close]").click();
        cy.get("[data-cy=modal-ingredient]").should("not.exist");
    });

    it("Тестирование закрытия модального окна с ингредиентом при клике на оверлей", () => {
        cy.get("[data-cy=ingredient-card]").first().click();
        cy.get("[data-cy=modal-ingredient]").should("be.visible");
        cy.get("[data-cy=modal-overlay]").click({ force: true });
        cy.get("[data-cy=modal-ingredient]").should("not.exist");
    });
});