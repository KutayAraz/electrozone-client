import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./common/Layout/index";
import Error from "./pages/Error/index";
import SignIn from "./pages/Sign-in";
import SignUp from "./pages/Sign-up";
import SignOut from "./pages/Sign-out";
import HomePage from "./pages/Home";
import UserProfile from "./pages/Your-Account/components/UserProfile";
import UpdatePassword from "./pages/Your-Account/components/UpdatePassword";
import Products, { loader as productsLoader } from "./pages/Products/index.tsx";
import Product from "./pages/Product/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <Error />,
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
        path: "/your-profile",
        element: <UserProfile />,
      },
      {
        path: "/your-profile/update-password",
        element: <UpdatePassword />,
      },
      {
        path: ":categories",
        children: [
          {
            path: ":subcategories",
            element: <Products />,
            loader: productsLoader,
            children: [
              {
                path: ":product",
                element: <Product />,
              },
            ],
          },
        ],
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
