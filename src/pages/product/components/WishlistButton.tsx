import React from 'react';

type WishlistButtonProps = {
  isWishlisted: boolean;
  toggleWishlist: () => void;
};

const WishlistButton = React.memo(({ isWishlisted, toggleWishlist }: WishlistButtonProps) => {
  return (
    <>
      {!isWishlisted ? (
        <button onClick={toggleWishlist}>Add to Wishlist</button>
      ) : (
        <button onClick={toggleWishlist}>Remove From Wishlist</button>
      )}
    </>
  );
});

export default WishlistButton;
