export type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type RefreshTokenResponse = {
  success: boolean;
};
