import { RouterProvider, createBrowserRouter, useNavigation } from "react-router-dom";
import Layout, { loader as LayoutLoader } from "./common/Layout/index";
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
import HomePage, { loader as homePageLoader } from "./pages/home/index.tsx";
import SignOut from "./pages/sign-out/index.tsx";
import SignUp from "./pages/sign-up/index.tsx";
import ProtectedRoute from "./common/ProtectedRoute.tsx";
import Checkout, { loader as checkoutLoader } from "./pages/checkout/index.tsx";
import UserWishlist, {
  loader as wishlistLoader,
} from "./pages/user-wishlist/index.tsx";
import SearchResultsPage, { loader as searchLoader } from "./pages/search/index.tsx";
import MyOrders, { loader as ordersLoader } from "./pages/my-orders/index.tsx";
import OrderSuccess from "./pages/order-success/index.tsx";
import OrderStatus, {
  loader as orderDetailLoader,
} from "./pages/order-status/index.tsx";
import ContactUs from "./pages/contact-us/index.tsx";
import UserAccount from "./pages/user-account/index.tsx";
import UserProfile, {
  loader as profileLoader,
} from "./pages/user-profile/index.tsx";
import UpdatePassword from "./pages/update-password/index.tsx";
import Trending, { loader as trendingLoader } from "./pages/trending/index.tsx";
import Contact from "./pages/contact-us/index.tsx";
import ProjectDetails from "./pages/project-details/index.tsx";
import SignInForm from "./pages/sign-in/index.tsx";
import Error from "./pages/error/index.tsx";
import UserProfileLayout from "./common/UserProfileLayout/UserProfileLayout.tsx";
import PageHelmet from "./common/PageHelmet.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: LayoutLoader,
    children: [
      {
        index: true,
        element:
          <>
            <PageHelmet title="Electrozone | Everything Electronics" description="Explore a wide variety of electronics from TVs to printers. Discover great deals and the latest technology at Electrozone." />
            <HomePage />
          </>,
        loader: homePageLoader,
      },
      {
        path: "/sign-up",
        element:
          <>
            <PageHelmet title="Sign Up | Electrozone" description="Create a new account at Electrozone to enjoy personalized services, faster checkout, and special offers." />
            <SignUp />
          </>,
      },
      {
        path: "/sign-in",
        element:
          <>
            <PageHelmet title="Sign In | Electrozone" description="Access your Electrozone account to manage your purchases, track orders, and update your preferences." />
            <SignInForm />
          </>,
      },
      {
        path: "/sign-out",
        element:
          <>
            <PageHelmet title="Sign Out | Electrozone" description="Securely log out of your Electrozone account." />
            <SignOut />
          </>,
      },
      {
        path: "/contact",
        element:
          <>
            <PageHelmet title="Contact Us | Electrozone" description="Have questions or suggestions? Send an e-mail." />
            <Contact />
          </>,
      },
      {
        path: "/project-details",
        element:
          <>
            <PageHelmet title="Project Details | Electrozone" description="Discover the technologies, libraries and methods used in creating Electrozone." />
            <ProjectDetails />
          </>,
      },
      {
        path: "/trending/:type",
        element:
          <>

            <Trending />
          </>,
        loader: trendingLoader,
      },
      {
        element: <UserProfileLayout />,
        path: "/my-account",
        children: [
          {
            index: true,
            element:
              <>
                <PageHelmet title="My Account | Electrozone" description="Manage your Electrozone account details, preferences, and settings." />
                <UserAccount />
              </>,
          },
          {
            path: "profile",
            element:
              <>
                <PageHelmet title="Profile | Electrozone" description="Update your personal information and contact details to keep your Electrozone profile up-to-date." />
                <UserProfile />
              </>,
            loader: profileLoader,
          },
          {
            path: "update-password",
            element:
              <>
                <PageHelmet title="Update Password | Electrozone" description="Change your password to ensure your Electrozone account remains secure." />
                <UpdatePassword />
              </>,
          },
          {
            path: "orders",
            children: [
              {
                index: true,
                element:
                  <>
                    <PageHelmet title="My Orders | Electrozone" description="View and manage your Electrozone orders, track shipping, and handle returns." />
                    <MyOrders />
                  </>,
                loader: ordersLoader,
              },
              {
                path: ":orderId",
                element:
                  <>
                    <PageHelmet title="Order Details | Electrozone" description="Check the status and details of your specific order at Electrozone." />
                    <OrderStatus />
                  </>,
                loader: orderDetailLoader,
              },
            ],
          },
          {
            path: "wishlist",
            element:
              <>
                <PageHelmet title="My Wishlist | Electrozone" description="Keep track of your favorite products and upcoming purchases in your Electrozone wishlist." />
                <UserWishlist />
              </>,
            loader: wishlistLoader,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchResultsPage />,
        loader: searchLoader,
      },
      {
        path: "/contact-us",
        element:
          <>
            <PageHelmet title="Contact Electrozone" description="Reach out to Electrozone for inquiries, support, and customer service." />
            <ContactUs />
          </>,
      },
      {
        path: "/my-cart",
        children: [
          {
            index: true,
            element: <><PageHelmet title="My Cart | Electrozone" description="Review and manage the items in your shopping cart at Electrozone." /><UserCart /></>,
            loader: cartLoader,
          },
        ],
      },
      {
        path: "/order-success",
        element:
          <>
            <PageHelmet title="Order Successful | Electrozone" description="Your mock order has been placed successfully! Thank you for trying Electrozone." />
            <OrderSuccess />
          </>,
      },
      {
        path: "/category/:category",
        children: [
          {
            index: true,
            element: <><CategoryPage /></>,
            loader: categoryLoader,
          },
          {
            path: ":subcategory",
            children: [
              {
                index: true,
                element: <><SubcategoryPage /></>,
                loader: subcategoryLoader,
              },
              {
                path: ":productSlug",
                element: <><ProductPage /></>,
                loader: productLoader,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element:
          <>
            <PageHelmet title="404 Not Found | Electrozone" description="The page you are looking for does not exist. Please check the URL or return to the homepage." />
            <Error />
          </>,
      }
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        path: "/checkout",
        element:
          <>
            <PageHelmet title="Checkout | Electrozone" description="Secure and streamlined checkout process to finalize your purchases at Electrozone." />
            <Checkout />
          </>,
        loader: checkoutLoader,
      },
    ],
  },
]);

function App() {
  return <div>
    <RouterProvider router={router} />
  </div>
}

export default App;
