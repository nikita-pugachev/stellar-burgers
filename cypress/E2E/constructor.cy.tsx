describe("Конструктор бургера", () => {
    const API_URL = "https://norma.education-services.ru/api";
    beforeEach(() => {
        cy.intercept("GET", `${API_URL}/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });

    it("Тестирование добавления ингредиентов в конструктор", () => {
        cy.get("[data-cy=bun]").first().find("button").contains("Добавить").click();
        cy.get("[data-cy=bun-top]").should("exist");
        cy.get("[data-cy=bun-bottom]").should("exist");
        cy.get("[data-cy=ingredient-card]").each(($element) => {
            cy.wrap($element).find("button").contains("Добавить").click();
        });
        cy.get("[data-cy=constructor-ingredient]").should("have.length", 2);
    });
});