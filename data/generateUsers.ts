import { fakerPT_BR as faker } from "@faker-js/faker";

interface User {
  fullName: string;
  email: string;
  document: string;
}

const generateUser = (): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const email = faker.internet.email({
    firstName,
    lastName,
  });
  const document = faker.number.int({
    min: 10000000000,
    max: 99999999999,
  });

  return {
    fullName,
    email,
    document: document.toString(),
  };
};

export const generateUsers = (quantity: number): User[] => {
  if (quantity <= 0) {
    throw new Error("A quantidade de usuários deve ser maior que zero.");
  }

  const users = [];

  for (let i = 0; i < quantity; i++) {
    const user = generateUser();
    users.push(user);
  }

  return users;
};
