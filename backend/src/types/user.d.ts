export type User = {
  _id: string;
  nickname: string;
  email: string;
  password: string;
  salt: string;
  favoriteSongs: string[];
  isValidPassword: (password: string) => Promise<boolean>;
};
