export type AuthSignUpRequestDTO = {
  name: string;
  email: string;
  password: string;
};

export type AuthSignInRequestDTO = {
  email: string;
  password: string;
};
