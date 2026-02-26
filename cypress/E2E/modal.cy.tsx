describe("Модальные окна", () => {
    const ingredient = "[data-cy=ingredient-card]";
    const modalClose = "[data-cy=modal-close]";
    const modalInfo = "[data-cy=modal-ingredient]"
    const overlay = "[data-cy=modal-overlay]"
    beforeEach(() => {
        cy.intercept("GET", `api/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });

    it("Тестирование октрытия модального окна с ингредиентом", () => {
        cy.get(ingredient).first().click();
        cy.get(modalInfo).should("be.visible");
        cy.contains("Детали ингредиента").should("exist");
    });

    it("Тестирование закрытия модального окна с ингредиентом при клике на крестик", () => {
        cy.get(ingredient).first().click();
        cy.get(modalInfo).should("be.visible");
        cy.get(modalClose).click();
        cy.get(modalInfo).should("not.exist");
    });

    it("Тестирование закрытия модального окна с ингредиентом при клике на оверлей", () => {
        cy.get(ingredient).first().click();
        cy.get(modalInfo).should("be.visible");
        cy.get(overlay).click({ force: true });
        cy.get(modalInfo).should("not.exist");
    });
});