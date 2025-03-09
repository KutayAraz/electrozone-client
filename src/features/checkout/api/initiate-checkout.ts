import { baseApi } from "@/lib/api/base-api";
import { CheckoutType } from "@/types/checkout";
import { CartItem } from "@/types/product";

interface CheckoutResponse {
  checkoutSnapshotId: string;
  cartData: {
    cartItems: CartItem[];
    cartTotal: number;
    totalQuantity: number;
  };
}

export interface InitiateCheckoutRequest {
  checkoutType: CheckoutType;
}

const initiateCheckoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateCheckout: builder.mutation<CheckoutResponse, InitiateCheckoutRequest>({
      query: (body) => ({
        url: "/order/initiate-checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "UserCart", id: "LIST" },
        { type: "SessionCart", id: "LIST" },
        { type: "BuyNowCart", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const { useInitiateCheckoutMutation } = initiateCheckoutApi;
