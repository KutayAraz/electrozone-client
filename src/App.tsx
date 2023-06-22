import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/index";
import Layout from "./common/Layout/index";
import Error from "./pages/Error/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
