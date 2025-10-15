// lib/utils/password-validator.ts

// 1. Define a "forma" do objeto que nossa função retornará.
// Isso ajuda com o autocomplete e a segurança de tipos no seu código.
export interface PasswordValidationState {
  hasLength: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean; // Um resumo de todas as regras
}

// 2. Define as expressões regulares para cada regra individual.
const REGEX_LOWERCASE = /[a-z]/;
const REGEX_UPPERCASE = /[A-Z]/;
const REGEX_NUMBER = /\d/;
const REGEX_SPECIAL_CHAR = /[!@#$%^&*()-_=+]/;

/**
 * Valida uma senha com base em várias regras e retorna um objeto com o estado de cada uma.
 * Ideal para fornecer feedback em tempo real na UI.
 * @param password A senha a ser validada.
 * @returns Um objeto PasswordValidationState com o resultado de cada regra.
 */
export const validatePasswordSteps = (
  password: string
): PasswordValidationState => {
  const p = password || ""; // Garante que a entrada não seja nula

  const state: PasswordValidationState = {
    hasLength: p.length >= 8,
    hasLowercase: REGEX_LOWERCASE.test(p),
    hasUppercase: REGEX_UPPERCASE.test(p),
    hasNumber: REGEX_NUMBER.test(p),
    hasSpecialChar: REGEX_SPECIAL_CHAR.test(p),
    isValid: false, // Será calculado a seguir
  };

  // 3. A senha só é válida se TODAS as regras forem verdadeiras.
  state.isValid =
    state.hasLength &&
    state.hasLowercase &&
    state.hasUppercase &&
    state.hasNumber &&
    state.hasSpecialChar;

  return state;
};
