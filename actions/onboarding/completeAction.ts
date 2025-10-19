"use server";

import type { OnboardingResponse } from "@/types/onboarding-actions";
import { isPasswordValid } from "@/utils/validators";

type OnboardingCompleteRequest = {
  token?: string | null;
  password: string;
  confirmPassword: string;
};

export async function onboardingCompleteAction({
  token,
  password,
  confirmPassword,
}: OnboardingCompleteRequest): Promise<OnboardingResponse> {
  const URL = process.env.EXTERNAL_API_URL;

  if (!URL) {
    return { success: false, description: "Server configuration error." };
  }

  if (!token) {
    return { success: false, description: "Token must be provided." };
  }

  if (password !== confirmPassword) {
    return { success: false, description: "Passwords do not match." };
  }

  if (!isPasswordValid(password)) {
    return {
      success: false,
      description: "Password did not meet the requirements.",
    };
  }

  try {
    const response = await fetch(`${URL}/onboarding/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword }),
    });

    if (!response.ok) {
      return { success: false, description: await response.text() };
    }

    return {
      success: true,
      description: await response.text(),
    };
  } catch (error) {
    return {
      success: false,
      description: `An unexpected error occurred. Error: ${error} `,
    };
  }
}
