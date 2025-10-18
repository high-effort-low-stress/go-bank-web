import { beforeEach, describe, expect, test, vi } from "vitest";
import { onboardingCompleteAction } from "@/lib/actions/onboarding/completeAction";

const { token, password, confirmPassword } = {
  token: "mock-token",
  password: "P@ssw0rd",
  confirmPassword: "P@ssw0rd",
};

describe("Server action: onboardingCompleteAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.EXTERNAL_API_URL = "https://api.example.com";
  });

  test("should return success message when API accepts the request)", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 200 })
    );

    //   Act
    const result = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    // Assert
    expect(result.success).toBe(true);
  });

  test("should return error message when empty or invalid data is provided", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 400 })
    );

    // Act
    const result = await onboardingCompleteAction({
      token: "",
      password: "",
      confirmPassword: "",
    });

    // Assert
    expect(result.success).toBe(false);
  });

  test("should return error message when token is expired", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 410 })
    );

    // Act
    const result = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    // Assert
    expect(result.success).toBe(false);
  });

  test("should return error message when an unexpected error occurs", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 500 })
    );

    // Act
    const result = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    // Assert
    expect(result.success).toBe(false);
  });
});
