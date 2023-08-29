import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./common/Layout/index";
import UpdatePassword from "./pages/your-account/components/UpdatePassword";
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
import OrderStatus from "./pages/order-status/index.tsx";
import ConfirmOrder from "./pages/confirm-order/index.tsx";
import HomePage from "./pages/home/index.tsx";
import SignIn from "./pages/sign-in/index.tsx";
import SignOut from "./pages/sign-out/index.tsx";
import SignUp from "./pages/sign-up/index.tsx";
import UserProfile from "./pages/your-account/index.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import Checkout, { loader as checkoutLoader } from "./pages/checkout/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            path: "/my-profile",
            element: <UserProfile />,
          },
          {
            path: "/my-profile/update-password",
            element: <UpdatePassword />,
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
        path: "/order-status",
        element: <OrderStatus />,
      },
      {
        path: ":category",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
