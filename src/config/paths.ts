export const paths = {
  home: {
    path: "/",
  },
  auth: {
    login: {
      path: "/sign-in",
    },
    register: {
      path: "/sign-up",
    },
    signOut: {
      path: "/sign-out",
    },
  },
  app: {
    root: {
      path: "/account",
    },
    profile: {
      path: "/account/profile",
      orders: {
        path: "/account/orders",
        order: {
          path: "/account/orders/:orderId",
        },
      },
    },
    wishlist: {
      path: "/account/wishlist",
    },
  },
  products: {
    category: {
      path: "/category/:category",
    },
    subcategory: {
      path: "/category/:category/:subcategory",
    },
    product: {
      path: "/category/:category/:subcategory/:productSlug",
    },
    search: {
      path: "/search",
    },
    trending: {
      path: "/trending/:type",
    },
  },
  cart: {
    path: "/cart",
  },
  checkout: {
    path: "/checkout",
    success: {
      path: "/order-success",
    },
  },
  misc: {
    contact: {
      path: "/contact-us",
    },
    projectDetails: {
      path: "/project-details",
    },
  },
};
