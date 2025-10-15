const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+]).{8,}$/;

const PHONE_NUMBER_REGEX =
  /^(?:(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?)?(?:9\d{4}[-.\s]?\d{4})$/;

export const isCpfValid = (cpf: string): boolean => {
  // Limpa o CPF, removendo formatação
  const cpfLimpo = String(cpf).replace(/\D/g, "");

  // 1. Verifica se tem 11 dígitos ou se é uma sequência de dígitos iguais
  if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
    return false;
  }

  // Converte para um array de números
  const digitos = cpfLimpo.split("").map(Number);

  // 2. Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += digitos[i] * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10) {
    resto = 0;
  }

  if (resto !== digitos[9]) {
    return false;
  }

  // 3. Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += digitos[i] * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10) {
    resto = 0;
  }

  if (resto !== digitos[10]) {
    return false;
  }

  // Se passou por todas as verificações, o CPF é válido
  return true;
};

export const isPhoneNumberValid = (phone: string): boolean => {
  return PHONE_NUMBER_REGEX.test(phone);
};

export const isPasswordValid = (password: string): boolean => {
  // "A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.",

  return PASSWORD_REGEX.test(password);
};
