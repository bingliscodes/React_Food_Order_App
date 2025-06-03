import { useContext } from "react";

import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            qty={item.quantity}
            price={item.price}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">
        Your total: {currencyFormatter.format(cartTotal)}
      </p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to checkout</Button>
      </p>
    </Modal>
  );
}
