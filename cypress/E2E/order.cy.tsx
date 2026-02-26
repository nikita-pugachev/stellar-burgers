describe("Оформление заказа", () => {
    const bun = "[data-cy=bun]";
    const ingredient = "[data-cy=ingredient-card]";
    const constructorBunTop = "[data-cy=bun-top]";
    const constructorBunBottom = "[data-cy=bun-bottom]";
    const constructorIngredient = "[data-cy=constructor-ingredient]";
    const modalClose = "[data-cy=modal-close]";
    const modalInfo = "[data-cy=modal-ingredient]"
    beforeEach(() => {
        cy.intercept("GET", `api/ingredients`, {
            fixture: "ingredients.json",
        });
        cy.visit('/');
    });

    it("Добавления ингредиентов в конструктор", () => {
        cy.get(bun).first().find("button").contains("Добавить").click();
        cy.get(constructorBunTop).should("exist");
        cy.get(constructorBunBottom).should("exist");
        cy.get(ingredient).each(($element) => {
            cy.wrap($element).find("button").contains("Добавить").click();
        });
        cy.get(constructorIngredient).should("have.length", 2);
    });

    it("Тестирование оформления заказа после авторизации", () => {
        cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as('postOrder');

        cy.setCookie('accessToken', 'Bearer access-token-test');
        localStorage.setItem('refreshToken', 'refresh-token-test');
        cy.reload();

        cy.wait('@getUser');

        cy.get(bun).first().find("button").contains("Добавить").click();
        cy.get(ingredient).first().find("button").contains("Добавить").click();
        cy.get(ingredient).eq(1).find("button").contains("Добавить").click();

        cy.get("button").contains("Оформить заказ").click();
        cy.wait('@postOrder');

        cy.get(modalInfo).should("exist");
        cy.get("h2").contains("1").should("exist");

        cy.get(modalClose).click();
        cy.get(modalInfo).should("not.exist");

        cy.get(constructorBunTop).should("not.exist");
        cy.get(constructorBunBottom).should("not.exist");
        cy.get(constructorIngredient).should("have.length", 0);

        cy.clearCookies();
        cy.clearLocalStorage();
    });
});