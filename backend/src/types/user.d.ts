export type User = {
  _id: string;
  nickname: string;
  email: string;
  password: string;
  salt: string;
  favoriteSongs: string[];
  recentSearchTerms: SearchTerm[];
  isValidPassword: (password: string) => Promise<boolean>;
};

export type SearchTerm = {
  text: string;
  createdAt: Date;
};
