"use server";

import { isPasswordValid } from "@/utils/validators";

type OnboardingCompleteResponse = {
  success: boolean;
  message: string;
};

type OnboardingCompleteRequest = {
  token: string;
  password: string;
  confirmPassword: string;
};

export async function onboardingCompleteAction({
  token,
  password,
  confirmPassword,
}: OnboardingCompleteRequest): Promise<OnboardingCompleteResponse> {
  const URL = process.env.EXTERNAL_API_URL;

  if (!URL) {
    return { success: false, message: "Server configuration error." };
  }

  if (!token) {
    return { success: false, message: "Token must be provided." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  if (!isPasswordValid(password)) {
    return {
      success: false,
      message: "Password did not meet the requirements.",
    };
  }

  try {
    const response = await fetch(`${URL}/onboarding/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password, confirmPassword }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: await response.text(),
      };
    }

    return {
      success: true,
      message: await response.text(),
    };
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
