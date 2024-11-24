import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { paths } from '@/config/paths';
import ProtectedRoute from '@/lib/auth';

export const createAppRouter = () =>
    createBrowserRouter([
        {
            path: paths.home.path,
            lazy: async () => {
                const { MainLayout, loader } = await import('@components/layouts/main-layout');
                return { Component: MainLayout, loader };
            },
            children: [
                {
                    index: true,
                    lazy: async () => {
                        const { HomePage, loader } = await import('@pages/home');
                        return {
                            Component: HomePage,
                            loader,
                        };
                    },
                },
                {
                    path: paths.auth.login.path,
                    lazy: async () => {
                        const { SignIn } = await import('@pages/sign-in');
                        return { Component: SignIn };
                    },
                },
                {
                    path: paths.auth.register.path,
                    lazy: async () => {
                        const { SignUp } = await import('@pages/sign-up');
                        return { Component: SignUp };
                    },
                },
                {
                    path: paths.products.category.path,
                    children: [
                        {
                            index: true,
                            lazy: async () => {
                                const { CategoryPage, loader } = await import('@pages/category');
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
                                        const { SubcategoryPage, loader } = await import('@pages/subcategory');
                                        return {
                                            Component: SubcategoryPage,
                                            loader,
                                        };
                                    },
                                },
                                {
                                    path: ':productSlug',
                                    lazy: async () => {
                                        const { ProductPage, loader } = await import('@pages/product');
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

            ],
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: paths.checkout.path,
                    lazy: async () => {
                        const { Checkout, loader } = await import('@pages/checkout');
                        return {
                            Component: Checkout,
                            loader,
                        };
                    },
                },
                {
                    index: true,
                    lazy: async () => {
                        const { UserAccount } = await import('@pages/user-account');
                        return { Component: UserAccount };
                    },
                },
                {
                    path: 'profile',
                    lazy: async () => {
                        const { UserProfile, loader } = await import('@pages/user-profile');
                        return {
                            Component: UserProfile,
                            loader,
                        };
                    },
                },
                {
                    path: 'orders',
                    children: [
                        {
                            index: true,
                            lazy: async () => {
                                const { MyOrders, loader } = await import('@pages/my-orders');
                                return {
                                    Component: MyOrders,
                                    loader,
                                };
                            },
                        },
                        {
                            path: ':orderId',
                            lazy: async () => {
                                const { OrderStatus, loader } = await import('@pages/order-status');
                                return {
                                    Component: OrderStatus,
                                    loader,
                                };
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: '*',
            lazy: async () => {
                const { Error } = await import('@pages/error');
                return { Component: Error };
            },

        },
    ]);

export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);
    return <RouterProvider router={router} />;
};