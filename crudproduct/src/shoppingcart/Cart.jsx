// src/components/Cart.jsx
import { useReducer, useMemo } from "react";
import { cartReducer } from "./cartReducer";
import CartItem from "./CartItem";
import ProductList from "./ProductList";

export default function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // derived state: total price
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const handleAdd = (product) => {
    dispatch({ type: "ADD", item: product });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>

      {/* Product list */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Products</h3>
        <ProductList onAdd={handleAdd} />
      </section>

      {/* Cart items */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Your Cart</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cart.map(item => (
              <CartItem key={item.id} item={item} dispatch={dispatch} />
            ))}
          </ul>
        )}
      </section>

      {/* Total */}
      <section className="border-t pt-4">
        <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
      </section>
    </div>
  );
}
