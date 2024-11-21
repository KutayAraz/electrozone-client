import { useMemo } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';
import { AppRoot } from './routes/app/root';

export const createAppRouter = () =>
    createBrowserRouter([
        {
            path: paths.home.path,
            lazy: async () => {
                const { Layout } = await import('@/common/layout');
                return { Component: Layout };
            },
            children: [
                {
                    index: true,
                    lazy: async () => {
                        const { HomePage, loader } = await import('@/features/home/routes/home-page');
                        return {
                            Component: HomePage,
                            loader,
                        };
                    },
                },
                {
                    path: paths.auth.login.path,
                    lazy: async () => {
                        const { SignInForm } = await import('@/features/auth/routes/sign-in');
                        return { Component: SignInForm };
                    },
                },
                {
                    path: paths.auth.register.path,
                    lazy: async () => {
                        const { SignUp } = await import('@/features/auth/routes/sign-up');
                        return { Component: SignUp };
                    },
                },
                {
                    path: paths.products.category.path,
                    children: [
                        {
                            index: true,
                            lazy: async () => {
                                const { CategoryPage, loader } = await import('@/features/products/routes/category-page');
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
                                        const { SubcategoryPage, loader } = await import('@/features/products/routes/subcategory-page');
                                        return {
                                            Component: SubcategoryPage,
                                            loader,
                                        };
                                    },
                                },
                                {
                                    path: ':productSlug',
                                    lazy: async () => {
                                        const { ProductPage, loader } = await import('@/features/products/routes/product-page');
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
                    path: paths.app.root.path,
                    element: <AppRoot />,
                    children: [
                        {
                            index: true,
                            lazy: async () => {
                                const { UserAccount } = await import('@/features/profile/routes/user-account');
                                return { Component: UserAccount };
                            },
                        },
                        {
                            path: 'profile',
                            lazy: async () => {
                                const { UserProfile, loader } = await import('@/features/profile/routes/user-profile');
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
                                        const { MyOrders, loader } = await import('@/features/orders/routes/my-orders');
                                        return {
                                            Component: MyOrders,
                                            loader,
                                        };
                                    },
                                },
                                {
                                    path: ':orderId',
                                    lazy: async () => {
                                        const { OrderStatus, loader } = await import('@/features/orders/routes/order-status');
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
            ],
        },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: paths.checkout.path,
                    lazy: async () => {
                        const { Checkout, loader } = await import('@/features/checkout/routes/checkout');
                        return {
                            Component: Checkout,
                            loader,
                        };
                    },
                },
            ],
        },
        {
            path: '*',
            lazy: async () => {
                const { Error } = await import('@/features/error/routes/error-page');
                return { Component: Error };
            },
        },
    ]);

export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);
    return <RouterProvider router={router} />;
};