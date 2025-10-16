describe("Onboarding Start Flow", () => {
  beforeEach(() => {
    cy.visit("/start");
  });

  it("should fill the onboarding start form and submit", () => {
    cy.get("form").within(() => {
      cy.get('input[name="fullName"]').type("Iago Silva");
      cy.get('input[name="email"]').type("iago@email.com");
      cy.get('input[name="document"]').type("24149162069");
      cy.get('input[name="terms"]').check({ force: true });
      cy.get('input[name="terms"]').should("be.checked");
    });
    cy.get("form").submit();

    cy.contains("Conta criada com sucesso!", { timeout: 10000 }).should(
      "be.visible"
    );
  });
  it("should show validation errors if form fields are empty or invalid", () => {
    cy.get("form").within(() => {
      cy.get('input[name="fullName"]').click().focus();
      cy.get('input[name="email"]').focus().blur();
      cy.get('input[name="document"]').focus().blur();
      cy.get('input[name="terms"]').focus().blur();
    });

    cy.contains("Nome Completo é obrigatório").should("be.visible");
    cy.contains("Email é obrigatório").should("be.visible");
    cy.contains("CPF é obrigatório").should("be.visible");

    cy.get("form").within(() => {
      cy.get('input[name="email"]').type("invalid-email").blur();
      cy.get('input[name="document"]').type("123").blur();
    });

    cy.contains("Email deve ser um email válido").should("be.visible");
    cy.contains("CPF deve ser um CPF válido").should("be.visible");
  });
});

describe("Onboarding Verify Flow", () => {
  beforeEach(() => {
    cy.visit("/verify");
  });

  it("should show verifique seu e-mail if user is not verified", () => {
    cy.contains("Verifique seu e-mail").should("be.visible");
  });

  it("should show Autenticando if user is verified", () => {
    cy.location().then((loc) => {
      loc.href = "/verify?token=validtoken";
      cy.visit(loc.href);
    });

    cy.contains("Autenticando...").should("be.visible");
  });
});

describe("Onboarding Complete Flow", () => {
  beforeEach(() => {
    cy.visit("/complete?token=validtoken");
  });

  it("should fill the onboarding complete form and submit", () => {
    cy.get("form").within(() => {
      cy.get('input[name="password"]').type("P@ssw0rd");
      cy.get('input[name="confirmPassword"]').type("P@ssw0rd");
    });
    cy.get("form").submit();

    cy.contains("sucesso", { timeout: 10000 }).should("be.visible");
  });

  it("should show validation errors if form fields are empty or invalid", () => {
    cy.get("form").within(() => {
      cy.get('input[name="password"]').type("invalidpassword");
      cy.get('input[name="confirmPassword"]').type("differentpassword");
    });
    cy.get("form").submit();

    cy.contains("Deve", { timeout: 10000 }).should("be.visible");
  });
});
