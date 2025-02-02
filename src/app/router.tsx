import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { MainLayout, loader as mainLayoutLoader } from "@/components/layouts/main-layout";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      element: <MainLayout />,
      loader: mainLayoutLoader,
      children: [
        {
          index: true,
          lazy: async () => {
            const { HomePage, loader } = await import("@pages/home");
            return {
              Component: HomePage,
              loader,
            };
          },
        },
        {
          path: paths.auth.login.path,
          lazy: async () => {
            const { SignIn } = await import("@pages/sign-in");
            return { Component: SignIn };
          },
        },
        {
          path: paths.auth.register.path,
          lazy: async () => {
            const { SignUp } = await import("@pages/sign-up");
            return { Component: SignUp };
          },
        },
        {
          path: paths.cart.path,
          lazy: async () => {
            const { UserCart, loader } = await import("@pages/user-cart");
            return { Component: UserCart, loader };
          },
        },
        {
          path: paths.products.category.path,
          children: [
            {
              index: true,
              lazy: async () => {
                const { CategoryPage, loader } = await import("@pages/category");
                return {
                  Component: CategoryPage,
                  loader,
                };
              },
            },
            {
              path: paths.products.subcategory.path,
              children: [
                {
                  index: true,
                  lazy: async () => {
                    const { SubcategoryPage, loader } = await import("@pages/subcategory");
                    return {
                      Component: SubcategoryPage,
                      loader,
                    };
                  },
                },
                {
                  path: ":productSlug",
                  lazy: async () => {
                    const { ProductPage, loader } = await import("@pages/product");
                    return {
                      Component: ProductPage,
                      loader,
                    };
                  },
                },
              ],
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: paths.app.root.path,
              lazy: async () => {
                const { UserAccount } = await import("@pages/user-account");
                return { Component: UserAccount };
              },
            },
            {
              path: paths.app.profile.path,
              lazy: async () => {
                const { UserProfile, loader } = await import("@pages/user-profile");
                return {
                  Component: UserProfile,
                  loader,
                };
              },
            },
            {
              path: paths.app.profile.orders.path,
              children: [
                {
                  index: true,
                  lazy: async () => {
                    const { MyOrders, loader } = await import("@pages/my-orders");
                    return {
                      Component: MyOrders,
                      loader,
                    };
                  },
                },
                {
                  path: paths.app.profile.orders.order.path,
                  lazy: async () => {
                    const { OrderDetails, loader } = await import("@/pages/order-details");
                    return {
                      Component: OrderDetails,
                      loader,
                    };
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: paths.checkout.path,
          lazy: async () => {
            const { Checkout, loader } = await import("@pages/checkout");
            return {
              Component: Checkout,
              loader,
            };
          },
        },
      ],
    },
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
