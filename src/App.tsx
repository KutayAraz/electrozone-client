import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./common/Layout/index";
import UpdatePassword from "./pages/your-account/components/UpdatePassword";
import SubcategoryPage, {
  loader as subcategoryLoader,
} from "./pages/subcategory/index";
import ProductPage, {
  loader as productLoader,
} from "./pages/product/index";
import CategoryPage, {
  loader as categoryLoader,
} from "./pages/category/index";
import UserCart, { loader as cartLoader } from "./pages/user-cart/index";
import OrderStatus from "./pages/order-status/index";
import ConfirmOrder from "./pages/confirm-order/index";
import HomePage from "./pages/home/index";
import SignIn from "./pages/sign-in/index";
import SignOut from "./pages/sign-out/index";
import SignUp from "./pages/sign-up/index";
import UserProfile from "./pages/your-account/index";
import ProtectedRoute from "./utils/ProtectedRoute";
import Checkout, { loader as checkoutLoader } from "./pages/checkout/index";

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
