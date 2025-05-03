// types.ts
export type CategoryParams = {
  category: string;
  subcategory?: string;
  productSlug?: string;
};

export type OrderParams = {
  orderId: string;
};

export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    signOut: {
      path: "/auth/logout",
      getHref: () => "/auth/logout",
    },
  },

  app: {
    root: {
      path: "/account",
      getHref: () => "/account",
    },
    profile: {
      path: "profile",
      getHref: () => "/account/profile",
      orders: {
        path: "orders",
        getHref: () => "/account/profile/orders",
        order: {
          path: ":orderId",
          getHref: (params: OrderParams) => `/account/profile/orders/${params.orderId}`,
        },
      },
    },
    wishlist: {
      path: "wishlist",
      getHref: () => "/account/wishlist",
    },
    security: {
      path: "security",
      getHref: () => "/account/security",
    },
  },

  products: {
    category: {
      path: "/category/:category",
      getHref: (params: Pick<CategoryParams, "category">) => `/category/${params.category}`,
    },
    subcategory: {
      path: ":subcategory",
      getHref: (params: Pick<CategoryParams, "category" | "subcategory">) =>
        `/category/${params.category}/${params.subcategory}`,
    },
    product: {
      path: ":productSlug",
      getHref: (params: CategoryParams) =>
        `/category/${params.category}/${params.subcategory}/${params.productSlug}`,
    },
    search: {
      path: "/search",
      getHref: (query?: string) => `/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    },
    trending: {
      path: "/trending/:type",
      getHref: (type: string) => `/trending/${type}`,
    },
  },

  cart: {
    path: "/cart",
    getHref: () => "/cart",
  },

  checkout: {
    root: {
      path: "/checkout",
      getHref: () => "/checkout",
    },
    success: {
      path: "/checkout/success",
      getHref: (orderId?: string) => `/checkout/success${orderId ? `?orderId=${orderId}` : ""}`,
    },
  },

  misc: {
    contact: {
      path: "/contact",
      getHref: () => "/contact",
    },
    projectDetails: {
      path: "/project-details",
      getHref: () => "/project-details",
    },
  },
} as const;
