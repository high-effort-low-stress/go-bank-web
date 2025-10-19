"use server";

import type { OnboardingStarUser } from "@/schemas/onboarding-schemas";
import type { OnboardingResponse } from "@/types/onboarding-actions";

export type OnbardingStartRequest = {
  user: OnboardingStarUser;
};

export const onboardingStartAction = async ({
  user,
}: OnbardingStartRequest): Promise<OnboardingResponse> => {
  const URL = process.env.EXTERNAL_API_URL;

  if (!URL) {
    console.error("External API URL is not defined.");
    return { success: false, description: "Erro de configuração no servidor." };
  }

  try {
    const response = await fetch(`${URL}/onboarding/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 409) {
      return { success: false, description: "Usuário já cadastrado." };
    }

    if (!response.ok) {
      return { success: false, description: await response.text() };
    }

    return {
      success: true,
      description: await response.text(),
    };
  } catch (error) {
    console.error("Falha na chamada fetch:", error);
    return {
      success: false,
      description: "Não foi possível conectar ao servidor. Tente novamente.",
    };
  }
};
