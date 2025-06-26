import { Spinner } from "@/components/ui/spinner";

type CartAdditionModalProps = {
  isOpen: boolean;
  isMerging: boolean;
  isCancelling: boolean;
  onAddToCart: () => void;
  onCancel: () => void;
};

export const CartAdditionModal = ({
  isOpen,
  isMerging,
  isCancelling,
  onAddToCart,
  onCancel,
}: CartAdditionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur and dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="relative mx-4 w-full max-w-md transform rounded-xl bg-white p-8 shadow-2xl transition-all">
        <div className="text-center">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">Add items to your cart?</h3>
          <p className="mb-6 text-gray-600">These items will be merged with your existing cart.</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={onAddToCart}
              className="rounded-md bg-blue-600 px-6 py-3 text-white font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isMerging || isCancelling}
            >
              {isMerging ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Adding to Cart...
                </span>
              ) : (
                "Yes, Add to Cart"
              )}
            </button>

            <button
              onClick={onCancel}
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={isMerging || isCancelling}
            >
              {isCancelling ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner />
                  Navigating back..
                </span>
              ) : (
                "No, Thanks"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
