export type AuthResponse = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  cartItemCount: number;
};

export type RefreshTokenResponse = {
  success: boolean;
};
