"use server";

import type { OnboardingResponse } from "@/types/onboarding-actions";

export type OnboardingVerifyRequest = {
  token?: string;
};

export const onboardingVerifyAction = async ({
  token,
}: OnboardingVerifyRequest): Promise<OnboardingResponse> => {
  const URL = process.env.EXTERNAL_API_URL;

  if (!URL) {
    return {
      success: false,
      description: "EXTERNAL_API_URL não definido.",
    };
  }

  if (!token) {
    return {
      success: false,
      description: "Token não fornecido.",
    };
  }

  try {
    const response = await fetch(`${URL}/onboarding/verify?token=${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        description: await response.text(),
      };
    }

    return {
      success: true,
      description: await response.text(),
    };
  } catch (error) {
    return {
      success: false,
      description: `An unexpected error occurred. ${error}`,
    };
  }
};
