import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  type OnbardingStartRequest,
  onboardingStartAction,
} from "@/actions/onboarding/startAction";
import type { OnboardingStarUser } from "@/schemas/onboarding-schemas";

const mockUser: OnboardingStarUser = {
  fullName: "João da Silva",
  document: "41487110006",
  email: "joao.silva@email.com",
};

const mockRequest: OnbardingStartRequest = {
  user: mockUser,
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
    const { success } = await onboardingStartAction(mockRequest);

    // Assert
    expect(success).toBe(true);
    expect(global, "fetch").toHaveBeenCalledOnce;
  });

  test("should fail when EXTERNAL_API_URL is not defined", async () => {
    delete process.env.EXTERNAL_API_URL;

    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    const { success, description } = await onboardingStartAction(mockRequest);

    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled;
    expect(description).toBeTypeOf("string");
  });

  test("should fail when empty or invalid data is provided and not call fetch", async () => {
    // Arrange
    const fetchSpy = vi.spyOn(global, "fetch");
    mockRequest.user.fullName = "";
    mockRequest.user.document = "";
    mockRequest.user.email = "";

    // Act
    const { success, description } = await onboardingStartAction(mockRequest);

    // Assert
    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled;
    expect(description).toBeTypeOf("string");
  });

  test("should return error message when user already exists", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 409 }));
    mockRequest.user.fullName = "João da Silva";
    mockRequest.user.document = "41487110006";
    mockRequest.user.email = "joao.silva@email.com";

    // Act
    const { success, description } = await onboardingStartAction(mockRequest);
    // Assert
    expect(success).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalledOnce;
    expect(description).toBeTypeOf("string");
  });

  test("should fail when API returns an unexpected error", async () => {
    // Arrange
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 500 }));

    // Act
    const { success, description } = await onboardingStartAction(mockRequest);

    // Assert
    expect(success).toBe(false);
    expect(fetchSpy).toHaveBeenCalledOnce;
    expect(description).toBeTypeOf("string");
  });
});
