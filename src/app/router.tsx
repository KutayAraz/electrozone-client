import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { paths } from "@/config/paths";
import { RedirectAuthenticated } from "@/features/auth/components/redirect-authenticated";
import { MainLayout, mainLayoutLoader } from "@/layouts/main-layout";
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
            const { HomePage, homePageLoader } = await import("@/pages/home");
            return { Component: HomePage, loader: homePageLoader };
          },
        },
        // Auth Section
        {
          path: paths.auth.login.path,
          element: <RedirectAuthenticated />,
          lazy: async () => {
            const { LoginPage } = await import("@/pages/login");
            return { Component: LoginPage };
          },
        },
        {
          path: paths.auth.register.path,
          element: <RedirectAuthenticated />,
          lazy: async () => {
            const { RegisterPage } = await import("@/pages/register");
            return { Component: RegisterPage };
          },
        },
        {
          path: paths.cart.path,
          lazy: async () => {
            const { CartPage } = await import("@/pages/cart");
            return { Component: CartPage };
          },
        },

        // Products Section
        {
          path: paths.products.trending.path,
          lazy: async () => {
            const { TrendingProductsPage, trendingProductsLoader } = await import(
              "@/pages/trending"
            );
            return { Component: TrendingProductsPage, loader: trendingProductsLoader };
          },
        },
        {
          path: paths.products.search.path,
          lazy: async () => {
            const { SearchPage, searchPageLoader } = await import("@/pages/search");
            return { Component: SearchPage, loader: searchPageLoader };
          },
        },
        {
          path: paths.products.category.path,
          children: [
            {
              index: true,
              lazy: async () => {
                const { CategoryPage, categoryLoader } = await import("@/pages/category");
                return { Component: CategoryPage, loader: categoryLoader };
              },
            },
            {
              path: paths.products.category.subcategory.path,
              children: [
                {
                  index: true,
                  lazy: async () => {
                    const { SubcategoryPage, subcategoryPageLoader } = await import(
                      "@/pages/subcategory"
                    );
                    return { Component: SubcategoryPage, loader: subcategoryPageLoader };
                  },
                },
                {
                  path: paths.products.category.subcategory.product.path,
                  lazy: async () => {
                    const { ProductPage, productPageLoader } = await import("@/pages/product");
                    return { Component: ProductPage, loader: productPageLoader };
                  },
                },
              ],
            },
          ],
        },
        // Misc Section
        {
          path: paths.misc.contact.path,
          lazy: async () => {
            const { ContactPage } = await import("@pages/contact");
            return { Component: ContactPage };
          },
        },
        {
          path: paths.misc.projectDetails.path,
          lazy: async () => {
            const { ProjectDetailsPage } = await import("@pages/project-details");
            return { Component: ProjectDetailsPage };
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
                const { AccountPage } = await import("@/pages/account");
                return { Component: AccountPage };
              },
            },
            {
              path: paths.app.profile.path,
              lazy: async () => {
                const { UserProfilePage } = await import("@/pages/user-profile");
                return { Component: UserProfilePage };
              },
            },
            {
              path: paths.app.security.path,
              lazy: async () => {
                const { AccountSecurityPage } = await import("@/pages/account-security");
                return { Component: AccountSecurityPage };
              },
            },
            {
              path: paths.app.profile.orders.path,
              children: [
                {
                  index: true,
                  lazy: async () => {
                    const { OrdersPage } = await import("@/pages/orders");
                    return { Component: OrdersPage };
                  },
                },
                {
                  path: paths.app.profile.orders.order.path,
                  lazy: async () => {
                    const { OrderDetails, orderDetailsLoader } = await import(
                      "@/pages/order-details"
                    );
                    return { Component: OrderDetails, loader: orderDetailsLoader };
                  },
                },
              ],
            },
            {
              path: paths.app.wishlist.path,
              lazy: async () => {
                const { WishlistPage, wishlistPageLoader } = await import("@pages/wishlist");
                return { Component: WishlistPage, loader: wishlistPageLoader };
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
            const { CheckoutPage, checkoutLoader } = await import("@/pages/checkout");
            return { Component: CheckoutPage, loader: checkoutLoader };
          },
        },
        {
          path: paths.checkout.success.path,
          lazy: async () => {
            const { OrderConfirmationPage, orderConfirmationLoader } = await import(
              "@/pages/order-confirmation"
            );
            return { Component: OrderConfirmationPage, loader: orderConfirmationLoader };
          },
        },
      ],
    },

    // 404 Route
    {
      path: "*",
      lazy: async () => {
        const { ErrorPage } = await import("@/pages/error");
        return { Component: ErrorPage };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
