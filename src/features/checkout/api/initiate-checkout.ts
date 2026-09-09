import type { CartResponse } from "@/features/cart/types/response";
import { baseApi } from "@/lib/api/base-api";
import { CheckoutType } from "@/types/checkout";

interface CheckoutResponse {
  checkoutSnapshotId: string;
  cartData: CartResponse;
}

export interface InitiateCheckoutRequest {
  checkoutType: CheckoutType;
}

export const initiateCheckoutApi = baseApi.injectEndpoints({
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
