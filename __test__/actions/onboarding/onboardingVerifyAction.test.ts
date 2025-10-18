import { beforeEach, describe, expect, test, vi } from "vitest";
import { onboardingVerifyAction } from "@/lib/actions/onboarding/verifyAction";

const mockToken = "mock-token";

describe("Server action: onboardingStartAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.EXTERNAL_API_URL = "https://api.example.com";
  });

  test("should return success message when API accepts the request", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 200 })
    );

    //   Act
    const result = await onboardingVerifyAction(mockToken);

    // Assert
    expect(result.success).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.EXTERNAL_API_URL}/onboarding/verify?token=${mockToken}`,
      expect.any(Object)
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("should return error message when empty or invalid data is provided", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 400 })
    );

    // Act
    const result = await onboardingVerifyAction("");

    // Assert
    expect(result.success).toBe(false);
  });

  test("should return error message when token is expired", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 410 })
    );

    // Act
    const result = await onboardingVerifyAction(mockToken);

    // Assert
    expect(result.success).toBe(false);
  });

  test("should return error message when an unexpected error occurs", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 500 })
    );

    // Act
    const result = await onboardingVerifyAction(mockToken);

    // Assert
    expect(result.success).toBe(false);
  });
});
