const FooterMenu = () => {
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="flex xs:hidden mx-2 justify-between text-center pt-4">
        <div>
          <p>Deals</p>
          <p>Most Wishlisted Items</p>
          <p>Returns & Replacements</p>
        </div>
        <div>
          <p>Frequently Asked Questions</p>
          <p>About Us</p>
          <p>Contact</p>
        </div>
      </div>
      <div className="hidden xs:flex w-full justify-between pt-4">
        <div>
          <h4>Get to know us</h4>
          <p>About us</p>
          <p>Contact</p>
          <p>Secure Checkout</p>
        </div>
        <div>
          <h4>Deals</h4>
          <p>Current Deals</p>
          <p>Most Wishlisted Items</p>
          <p>Premium Subscription</p>
        </div>
        <div>
          <h4>Help</h4>
          <p>Frequently Asked Questions</p>
          <p>Returns & Replacements</p>
          <p>Customer Service</p>
        </div>
      </div>
    </div>
  );
};

export default FooterMenu;
