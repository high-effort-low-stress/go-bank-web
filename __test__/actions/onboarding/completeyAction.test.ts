import { beforeEach, describe, expect, test, vi } from "vitest";
import { onboardingCompleteAction } from "@/actions/onboarding/completeAction";

const { token, password, confirmPassword } = {
  token: "mock-token",
  password: "P@ssw0rd",
  confirmPassword: "P@ssw0rd",
};

describe("Server action: completeAction", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.EXTERNAL_API_URL = "https://api.example.com";
  });

  test("should return success message when API accepts the request)", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    //   Act
    const { success, description } = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    // Assert
    expect(success).toBe(true);
    expect(fetchSpy).toHaveBeenCalledOnce;
    expect(description).toBeTypeOf("string");
  });

  test("should return error message when empty or invalid data is provided", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 400 }));

    // Act
    const { success, description } = await onboardingCompleteAction({
      token: "",
      password: "",
      confirmPassword: "",
    });

    // Assert
    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled;
    expect(description).toBeTypeOf("string");
  });

  test("should return error message when EXTERNAL_API_URL is not defined and not call fetch", async () => {
    // Arrange
    delete process.env.EXTERNAL_API_URL;
    const fetchSpy = vi.spyOn(global, "fetch");

    // Act
    const { success, description } = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    // Assert
    expect(success).toBe(false);
    expect(description).toBeTypeOf("string");
    expect(fetchSpy).not.toHaveBeenCalled;
  });

  test("should not return success and not call fetch when passwords do not match", async () => {
    // Arrange
    const fetchSpy = vi.spyOn(global, "fetch");

    // Act
    const { success } = await onboardingCompleteAction({
      token,
      password,
      confirmPassword: "differentPassword",
    });

    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled;
  });

  test("should not return success and not call fetch when password does not meet requirements", async () => {
    // Arrange
    const fetchSpy = vi.spyOn(global, "fetch");

    // Act
    const { success } = await onboardingCompleteAction({
      token,
      password: "weak",
      confirmPassword: "weak",
    });

    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled;
  });

  test("should not return success when API returns an unexpected error", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 500 }));

    // Act
    const { success, description } = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    // Assert
    expect(success).toBe(false);
    expect(description).toBeTypeOf("string");
    expect(fetchSpy).toHaveBeenCalledOnce;
  });

  test("should not return success when API return an error", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockRejectedValue(new Response(null, { status: 400 }));

    const { success, description } = await onboardingCompleteAction({
      token,
      password,
      confirmPassword,
    });

    expect(success).toBe(false);
    expect(description).toBeTypeOf("string");
    expect(fetchSpy).toHaveBeenCalledOnce;
  });
});
