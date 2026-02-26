describe("Оформление заказа", () => {
    const API_URL = "https://norma.education-services.ru/api";
    beforeEach(() => {
        cy.intercept("GET", `${API_URL}/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });

    it("Добавления ингредиентов в конструктор", () => {
        cy.get("[data-cy=bun]").first().find("button").contains("Добавить").click();
        cy.get("[data-cy=bun-top]").should("exist");
        cy.get("[data-cy=bun-bottom]").should("exist");
        cy.get("[data-cy=ingredient-card]").each(($element) => {
            cy.wrap($element).find("button").contains("Добавить").click();
        });
        cy.get("[data-cy=constructor-ingredient]").should("have.length", 2);
    });

    it("Тестирование оформления заказа после авторизации", () => {
        cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order.json' }).as('postOrder');

        cy.setCookie('accessToken', 'Bearer access-token-test');
        localStorage.setItem('refreshToken', 'refresh-token-test');
        cy.reload();

        cy.wait('@getUser');

        cy.get("[data-cy=bun]").first().find("button").contains("Добавить").click();
        cy.get("[data-cy=ingredient-card]").first().find("button").contains("Добавить").click();
        cy.get("[data-cy=ingredient-card]").eq(1).find("button").contains("Добавить").click();

        cy.get("button").contains("Оформить заказ").click();
        cy.wait('@postOrder');

        cy.get("[data-cy=modal-ingredient]").should("exist");
        cy.get("h2").contains("1").should("exist");

        cy.get("[data-cy=modal-close]").click();
        cy.get("[data-cy=modal-ingredient]").should("not.exist");

        cy.get("[data-cy=bun-top]").should("not.exist");
        cy.get("[data-cy=bun-bottom]").should("not.exist");
        cy.get("[data-cy=constructor-ingredient]").should("have.length", 0);
    });
});