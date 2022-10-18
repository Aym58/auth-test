export type UserValues = {
  firstName: string;
  lastName: string;
  email: string;
  postData?: string;
};

export type UserLocal = {
  id: string;
  name: string;
  token: string;
  status: string;
};

export type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};
