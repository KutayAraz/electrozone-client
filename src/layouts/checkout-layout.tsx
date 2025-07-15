import { ArrowBack, Security, ShoppingCart } from "@mui/icons-material";
import { Divider } from "@mui/material";

import { paths } from "@/config/paths";
import BrandIcon from "@assets/brand-images/brand-logo.svg?react";

type CheckoutLayoutProps = {
  children: React.ReactNode;
  hideBackButton?: boolean;
  isSuccessPage?: boolean;
  onBackClick?: () => void;
};

export const CheckoutLayout = ({
  hideBackButton = false,
  isSuccessPage = false,
  children,
  onBackClick,
}: CheckoutLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white py-4 shadow-sm">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex items-center justify-between">
            <div className="transition-transform duration-200">
              <BrandIcon className="h-10 w-auto md:h-12" />
            </div>

            <div className="items-center space-x-1 text-sm text-gray-600 flex">
              <Security className="h-4 w-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="mx-auto max-w-screen-xl px-4 py-6">
          <div
            className={`mb-4 flex items-center ${
              hideBackButton ? "justify-end" : "justify-between"
            }`}
          >
            {!hideBackButton && (
              <button
                onClick={onBackClick}
                className="flex items-center rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                <ArrowBack className="mr-1 h-4 w-4" />
                <span>Back to Cart</span>
              </button>
            )}

            <div className="hidden items-center md:flex">
              <ShoppingCart className="mr-2 text-blue-600" />
              <span className="font-medium text-gray-800">Checkout</span>
            </div>
          </div>

          <Divider className="mb-6" />

          {/* Checkout Steps */}
          <div className="mb-6 hidden md:block">
            <div className="flex items-center justify-center">
              <div className="flex max-w-[600px] flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    1
                  </div>
                  <span className="mt-1 text-xs text-blue-600">Cart</span>
                </div>

                <div className="h-[2px] flex-1 bg-blue-600"></div>

                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    2
                  </div>
                  <span className="mt-1 text-xs text-blue-600">Checkout</span>
                </div>

                <div
                  className={`h-[2px] flex-1 ${isSuccessPage ? "bg-blue-600" : "bg-gray-300"}`}
                ></div>

                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isSuccessPage ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`mt-1 text-xs ${isSuccessPage ? "text-blue-600" : "text-gray-600"}`}
                  >
                    Confirmation
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Content */}
          <div className="mb-10 rounded-lg sm:bg-white sm:p-6 sm:shadow-sm">{children}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white py-4">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()}, electrozone.com</p>

            <div className="flex space-x-4 text-xs text-gray-500">
              <a href={paths.misc.projectDetails.getHref()} className="hover:text-blue-600">
                Project details
              </a>
              <a href={paths.misc.contact.getHref()} className="hover:text-blue-600">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
