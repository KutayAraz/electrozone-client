import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./common/Layout/index";
import SubcategoryPage, {
  loader as subcategoryLoader,
} from "./pages/subcategory/index.tsx";
import ProductPage, {
  loader as productLoader,
} from "./pages/product/index.tsx";
import CategoryPage, {
  loader as categoryLoader,
} from "./pages/category/index.tsx";
import UserCart, { loader as cartLoader } from "./pages/user-cart/index.tsx";
import ConfirmOrder from "./pages/confirm-order/index.tsx";
import HomePage, { loader as homePageLoader } from "./pages/home/index.tsx";
import SignIn from "./pages/sign-in/index.tsx";
import SignOut from "./pages/sign-out/index.tsx";
import SignUp from "./pages/sign-up/index.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import Checkout, { loader as checkoutLoader } from "./pages/checkout/index.tsx";
import UserWishlist, {
  loader as wishlistLoader,
} from "./pages/user-wishlist/index.tsx";
import SearchResultsPage from "./pages/search/index.tsx";
import MyOrders, { loader as ordersLoader } from "./pages/my-orders/index.tsx";
import OrderSuccess from "./pages/order-success/index.tsx";
import OrderStatus, {
  loader as orderDetailLoader,
} from "./pages/order-status/index.tsx";
import ContactUs from "./pages/contact-us/index.tsx";
import UserAccount from "./pages/user-account/index.tsx";
import UserProfile, { loader as profileLoader } from "./pages/user-profile/index.tsx";
import UpdatePassword from "./pages/update-password/index.tsx";
import Trending, {loader as trendingLoader} from "./pages/trending/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-out",
        element: <SignOut />,
      },
      {
        path: "/trending/:type",
        element: <Trending />,
        loader: trendingLoader
      },
      {
        element: <ProtectedRoute />,
        path: "/my-account",
        children: [
          {
            index: true,
            element: <UserAccount />,
          },
          {
            path: "profile",
            element: <UserProfile />,
            loader: profileLoader
          },
          {
            path: "update-password",
            element: <UpdatePassword />,
          },
          {
            path: "orders",
            children: [
              {
                index: true,
                element: <MyOrders />,
                loader: ordersLoader,
              },
              {
                path: ":orderId",
                element: <OrderStatus />,
                loader: orderDetailLoader,
              },
            ],
          },
          {
            path: "wishlist",
            element: <UserWishlist />,
            loader: wishlistLoader,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchResultsPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/my-cart",
        children: [
          {
            index: true,
            element: <UserCart />,
            loader: cartLoader,
          },
          {
            path: "confirm-order",
            element: <ConfirmOrder />,
          },
        ],
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/category/:category",
        children: [
          {
            index: true,
            element: <CategoryPage />,
            loader: categoryLoader,
          },
          {
            path: ":subcategory",
            children: [
              {
                index: true,
                element: <SubcategoryPage />,
                loader: subcategoryLoader,
              },
              {
                path: ":productId",
                element: <ProductPage />,
                loader: productLoader,
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
        index: true,
        path: "/checkout",
        element: <Checkout />,
        loader: checkoutLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
