import { describe, expect, it } from "vitest";
import {
  type OnboardingComplete,
  OnboardingCompleteSchema,
  OnboardingStartUserSchema,
  type OnboardingStarUser,
} from "@/schemas/onboarding-schemas";

const validOnboardingStartData: OnboardingStarUser = {
  fullName: "John Doe",
  document: "54265271057",
  email: "john.doe@example.com",
};

const validOnboardingCompleteData: OnboardingComplete = {
  password: "P@ssw0rd",
  confirmPassword: "P@ssw0rd",
};

describe("OnboardingStartSchema: Validation if data is correct", () => {
  it("should validate a correct data object", () => {
    const mockData = { ...validOnboardingStartData };
    const parsedData = OnboardingStartUserSchema.safeParse(mockData);

    expect(parsedData.success).toBe(true);
  });
});

describe("OnboardingStartSchema: Validation if a field is missing", () => {
  it("should fail if fullName is empty", () => {
    const data = { ...validOnboardingStartData, fullName: "" };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Nome Completo é obrigatório."
      );
    }
  });

  it("should fail if email is empty", () => {
    const data = { ...validOnboardingStartData, email: "" };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email é obrigatório.");
    }
  });

  it("should fail if document is empty", () => {
    const data = { ...validOnboardingStartData, document: "" };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("CPF é obrigatório.");
    }
  });
});

describe("OnboardingStartSchema: Validation if a field is invalid", () => {
  it("should fail if fullName is too short", () => {
    const data = { ...validOnboardingStartData, fullName: "John" };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Informe seu nome completo.");
    }
  });

  it("should fail if fullName is too long", () => {
    const data = { ...validOnboardingStartData, fullName: "a".repeat(101) };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nome muito longo.");
    }
  });

  it("should fail if email is invalid", () => {
    const data = { ...validOnboardingStartData, email: "invalid-email" };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("E-mail inválido.");
    }
  });

  it("should fail if document is invalid", () => {
    const data = { ...validOnboardingStartData, document: "12345678900" };
    const result = OnboardingStartUserSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("CPF inválido.");
    }
  });
});

describe("OnboardingCompleteSchema: Validation if data is correct", () => {
  it("should validate a correct data object", () => {
    const mockData = { ...validOnboardingCompleteData };
    const parsedData = OnboardingCompleteSchema.safeParse(mockData);

    expect(parsedData.success).toBe(true);
  });
});

describe("OnboardingCompleteSchema: Validation if a field is invalid", () => {
  it("should fail if password does not match requirements", () => {
    const data = { ...validOnboardingCompleteData, password: "weak" };
    const result = OnboardingCompleteSchema.safeParse(data);
    expect(result.success).toBe(false);

    if (result.error) {
      expect(result.error.issues).toHaveLength(4);
    }
  });
  it("should fail if password is too long", () => {
    const data = {
      ...validOnboardingCompleteData,
      password: `${validOnboardingCompleteData.password}`.repeat(9),
    };
    const result = OnboardingCompleteSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "A senha deve ter no máximo 64 caracteres."
      );
    }
  });
  it("should fail if confirmPassword does not match password", () => {
    const data = {
      ...validOnboardingCompleteData,
      confirmPassword: "P@ssw0rd1",
    };
    const result = OnboardingCompleteSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("As senhas não coincidem.");
    }
  });
});
