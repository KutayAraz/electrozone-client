type CartAdditionModalProps = {
  isOpen: boolean;
  isMerging: boolean;
  onAddToCart: () => void;
  onCancel: () => void;
};

export const CartAdditionModal = ({
  isOpen,
  isMerging,
  onAddToCart,
  onCancel,
}: CartAdditionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <p className="mb-4 text-lg">Do you want to add these items to your cart?</p>
        <div className="flex space-x-4">
          <button
            onClick={onAddToCart}
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            disabled={isMerging}
          >
            {isMerging ? "Navigating" : "Yes, Add to Cart"}
          </button>
          <button
            onClick={onCancel}
            className="rounded-md bg-gray-300 px-4 py-2 text-black transition-colors hover:bg-gray-400"
          >
            No, Thanks
          </button>
        </div>
      </div>
    </div>
  );
};
