import { useGetSessionCartQuery } from "@/features/cart/api/session-cart/get-session-cart";
import { useGetUserCartQuery } from "@/features/cart/api/user-cart/get-user-cart";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";

export const useGetCart = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Use the appropriate query based on authentication status
  const {
    data: userCartData,
    isLoading: isLoadingUserCart,
    ...userCartRest
  } = useGetUserCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const {
    data: sessionCartData,
    isLoading: isLoadingSessionCart,
    ...sessionCartRest
  } = useGetSessionCartQuery(undefined, {
    skip: isAuthenticated,
  });

  // Combine the results
  return {
    cartData: isAuthenticated ? userCartData : sessionCartData,
    isLoading: isAuthenticated ? isLoadingUserCart : isLoadingSessionCart,
    ...(isAuthenticated ? userCartRest : sessionCartRest),
  };
};
