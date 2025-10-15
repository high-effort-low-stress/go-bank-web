"use server";

interface OnboardingVerifyResponse {
  success: boolean;
  message: string;
}

const API_URL = process.env.EXTERNAL_API_URL;

export const onboardingVerifyAction = async (
  token: string | null | undefined
): Promise<OnboardingVerifyResponse> => {
  if (!API_URL) {
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
    const response = await fetch(
      `${API_URL}/onboarding/verify?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    switch (response.status) {
      case 200:
        return { success: true, message: "E-mail verificado com sucesso." };
      case 400:
        return { success: false, message: "O link de verificação é inválido." };
      case 409:
        return { success: false, message: "Este e-mail já foi verificado." };
      case 410:
        return { success: false, message: "O link de verificação expirou." };
      default:
        return { success: false, message: "Ocorreu um erro ao verificar." };
    }
  } catch (error) {
    console.error("onboardingVerify Error:", error);
    return { success: false, message: "Não foi possível conectar ao serviço." };
  }
};
