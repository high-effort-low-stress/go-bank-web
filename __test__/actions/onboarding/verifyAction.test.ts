import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  type OnboardingVerifyRequest,
  onboardingVerifyAction,
} from "@/actions/onboarding/verifyAction";

const mockToken: OnboardingVerifyRequest = {
  token: "mock-token",
};

describe("Server action: onboardingVerifyAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.EXTERNAL_API_URL = "https://api.example.com";
  });

  test("should return success when API accepts the request", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));
    //   Act
    const { success } = await onboardingVerifyAction(mockToken);

    // Assert
    expect(success).toBe(true);
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith(
      `${process.env.EXTERNAL_API_URL}/onboarding/verify?token=${mockToken.token}`,
      expect.any(Object)
    );
  });

  test("should not return success and not call fetch when EXTERNAL_API_URL is not defined", async () => {
    const fetchSpy = vi.spyOn(global, "fetch");
    delete process.env.EXTERNAL_API_URL;

    const { success, description } = await onboardingVerifyAction(mockToken);

    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(description).toBeTypeOf("string");
  });

  test("should not return success and not call fetch when token is not provided", async () => {
    // Arrange
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(null, { status: 400 })
    );

    mockToken.token = "";

    // Act
    const { success, description } = await onboardingVerifyAction(mockToken);

    // Assert
    expect(success).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(description).toBeTypeOf("string");
  });

  test("should not return success when API returns an unexpected error", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 500 }));

    // Act
    const { success, description } = await onboardingVerifyAction(mockToken);

    // Assert
    expect(success).toBe(false);
    expect(fetchSpy).toHaveBeenCalledOnce;
    expect(description).toBeTypeOf("string");
  });
  test("should not return success when API response is not OK", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 400 }));

    // Act
    const { success, description } = await onboardingVerifyAction(mockToken);

    // Assert
    expect(success).toBe(false);
    expect(fetchSpy).toHaveBeenCalledOnce;
    expect(description).toBeTypeOf("string");
  });

  test("should not return success when an unexpected error occurs", async () => {
    // Arrange
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue;

    const { success, description } = await onboardingVerifyAction(mockToken);

    expect(success).toBe(false);
    expect(fetchSpy).toHaveBeenCalledOnce;
    expect(description).toBeTypeOf("string");
  });
});
