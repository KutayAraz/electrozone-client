import { CheckoutType } from "@/types/checkout";

/**
 * Whether to merge the guest cart into the account right after a login.
 *
 * The guest cart follows the user into their account. A guest who clicked checkout is
 * the exception: they check out only the guest cart, so it stays separate until the
 * order is placed or they leave the checkout.
 */
export const shouldMergeGuestCartOnLogin = (
  guestCartCount: number | undefined,
  checkoutIntent: CheckoutType,
) => Boolean(guestCartCount) && checkoutIntent !== CheckoutType.SESSION;
