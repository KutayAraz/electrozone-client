import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/index";
import Layout from "./common/Layout/index";
import Error from "./pages/Error/index";
import ProductList from "./pages/Product-List";
import Signup from "./pages/Sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductList />,
        errorElement: <Error />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
