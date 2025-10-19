export const isPasswordValid = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+]).{8,}$/.test(password);

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
