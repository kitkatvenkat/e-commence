import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="text-blue-500">Shop Now</Link></p>
      ) : (
        <div>
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border p-2">
                    <img src={item.image1} alt={item.productname} className="h-16 w-16 object-cover mx-auto" />
                  </td>
                  <td className="border p-2">{item.productname}</td>
                  <td className="border p-2">₹{item.price}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateCartQuantity(item._id, e.target.value)}
                      className="border p-1 w-12 text-center"
                      min="1"
                    />
                  </td>
                  <td className="border p-2">₹{item.price * item.quantity}</td>
                  <td className="border p-2">
                    <button onClick={() => removeFromCart(item._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: ₹{totalAmount}</h3>
            <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
