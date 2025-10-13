export interface User {
  firstName: string;
  lastName: string;
  email: string;
  document: string;
}

export const mockUsers = (): User[] => {
  return [
    {
      firstName: "Luke",
      lastName: "Skywalker",
      email: "luke@jedi.com",
      document: "12345678900",
    },
    {
      firstName: "Leia",
      lastName: "Organa",
      email: "leia@jedi.com",
      document: "98765432100",
    },
    {
      firstName: "Han",
      lastName: "Solo",
      email: "han@jedi.com",
      document: "11223344550",
    },
  ];
};
