import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/components/layouts/main-layout";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <MainLayout />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { HomePage } = await import("@pages/home");
            return { Component: HomePage };
          },
        },
        // Auth Section
        {
          path: paths.auth.login.path,
          lazy: async () => {
            const { LoginPage } = await import("@pages/login");
            return { Component: LoginPage };
          },
        },
        {
          path: paths.auth.register.path,
          lazy: async () => {
            const { RegisterPage } = await import("@pages/register");
            return { Component: RegisterPage };
          },
        },

        // Products Section
        {
          path: paths.products.category.path,
          lazy: async () => {
            const { CategoryPage } = await import("@pages/category");
            return { Component: CategoryPage };
          },
          children: [
            {
              path: paths.products.subcategory.path,
              lazy: async () => {
                const { SubcategoryPage } = await import("@pages/subcategory");
                return { Component: SubcategoryPage };
              },
              children: [
                {
                  path: paths.products.product.path,
                  lazy: async () => {
                    const { ProductPage } = await import("@pages/product");
                    return { Component: ProductPage };
                  },
                },
              ],
            },
          ],
        },

        // Cart (Public)
        {
          path: paths.cart.path,
          lazy: async () => {
            const { UserCart } = await import("@pages/user-cart");
            return { Component: UserCart };
          },
        },

        // Protected Account Section
        {
          path: paths.app.root.path,
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              lazy: async () => {
                const { UserAccount } = await import("@pages/user-account");
                return { Component: UserAccount };
              },
            },
            {
              path: paths.app.profile.path,
              lazy: async () => {
                const { UserProfile } = await import("@pages/user-profile");
                return { Component: UserProfile };
              },
            },
            {
              path: paths.app.profile.orders.path,
              children: [
                {
                  index: true,
                  lazy: async () => {
                    const { MyOrders } = await import("@pages/my-orders");
                    return { Component: MyOrders };
                  },
                },
                {
                  path: paths.app.profile.orders.order.path,
                  lazy: async () => {
                    const { OrderDetails } = await import("@pages/order-details");
                    return { Component: OrderDetails };
                  },
                },
              ],
            },
            {
              path: paths.app.wishlist.path,
              lazy: async () => {
                const { UserWishlist } = await import("@pages/wishlist");
                return { Component: UserWishlist };
              },
            },
          ],
        },
      ],
    },

    // Protected Checkout Section (Separate from main layout)
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: paths.checkout.root.path,
          lazy: async () => {
            const { Checkout } = await import("@pages/checkout");
            return { Component: Checkout };
          },
        },
        {
          path: paths.checkout.success.path,
          lazy: async () => {
            const { OrderSuccessPage } = await import("@pages/order-success");
            return { Component: OrderSuccessPage };
          },
        },
      ],
    },

    // 404 Route
    {
      path: "*",
      lazy: async () => {
        const { Error } = await import("@pages/error");
        return { Component: Error };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
