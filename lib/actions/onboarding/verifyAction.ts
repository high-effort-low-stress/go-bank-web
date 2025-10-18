"use server";

interface OnboardingVerifyResponse {
  success: boolean;
  message: string;
}

export const onboardingVerifyAction = async (
  token: string | undefined | null
): Promise<OnboardingVerifyResponse> => {
  const URL = process.env.EXTERNAL_API_URL;

  if (!URL) {
    console.error("External API URL is not defined.");
    return {
      success: false,
      message: "Erro de configuração no servidor.",
    };
  }

  if (!token) {
    return {
      success: false,
      message: "Token não fornecido.",
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
        message: await response.text(),
      };
    }

    return {
      success: true,
      message: await response.text(),
    };
  } catch (error) {
    console.error("onboardingVerify Error:", error);
    return { success: false, message: "Não foi possível conectar ao serviço." };
  }
};
