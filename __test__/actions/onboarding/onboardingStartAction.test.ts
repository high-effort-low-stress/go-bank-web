import { beforeEach, describe, expect, test, vi } from "vitest";
import { onboardingStartAction } from "@/lib/actions/onboarding/startAction";

const mockUser = {
  fullName: "João da Silva",
  document: "41487110006",
  email: "joao.silva@email.com",
};

describe("Server action: onboardingStartAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.EXTERNAL_API_URL = "https://api.example.com";
  });

  test("should return success message when API accepts the request", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 202 })
    );

    //   Act
    const result = await onboardingStartAction(mockUser);

    // Assert
    expect(result.success).toBe(true);
  });

  test("should return error message when empty or invalid data is provided", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 400 })
    );

    // Act
    const result = await onboardingStartAction({
      fullName: "",
      document: "",
      email: "",
    });

    // Assert
    expect(result.success).toBe(false);
  });

  test("should return error message when user already exists", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 409 })
    );

    // Act
    const result = await onboardingStartAction({
      fullName: "João da Silva",
      document: "41487110006",
      email: "joao.silva@email.com",
    });
    // Assert
    expect(result.success).toBe(false);
  });
});
