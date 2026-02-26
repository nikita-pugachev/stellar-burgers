describe("Конструктор бургера", () => {
    const bun = "[data-cy=bun]";
    const ingredient = "[data-cy=ingredient-card]";
    const constructorBunTop = "[data-cy=bun-top]";
    const constructorBunBottom = "[data-cy=bun-bottom]";
    const constructorIngredient = "[data-cy=constructor-ingredient]";
    beforeEach(() => {
        cy.intercept("GET", `api/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });

    it("Тестирование добавления ингредиентов в конструктор", () => {
        cy.get(bun).first().find("button").contains("Добавить").click();
        cy.get(constructorBunTop).should("exist");
        cy.get(constructorBunBottom).should("exist");
        cy.get(ingredient).each(($element) => {
            cy.wrap($element).find("button").contains("Добавить").click();
        });
        cy.get(constructorIngredient).should("have.length", 2);
    });
});