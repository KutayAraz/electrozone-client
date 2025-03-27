import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { useSelector } from "react-redux";
import { useGetSessionCartCountQuery } from "../api/session-cart/get-session-cart-count";
import { useGetUserCartCountQuery } from "../api/user-cart/get-user-cart-count";

export const useCartCount = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Only run the appropriate query based on authentication status
  const { data: userCartCount = 0, isLoading: isUserCartLoading } = useGetUserCartCountQuery(
    undefined,
    {
      skip: !isAuthenticated,
    },
  );

  const { data: sessionCartCount = 0, isLoading: isSessionCartLoading } =
    useGetSessionCartCountQuery(undefined, {
      skip: isAuthenticated,
    });

  const itemCount = isAuthenticated ? userCartCount : sessionCartCount;
  const isLoading = isAuthenticated ? isUserCartLoading : isSessionCartLoading;

  return { itemCount, isLoading };
};
