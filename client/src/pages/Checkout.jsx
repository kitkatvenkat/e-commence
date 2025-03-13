import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";

const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const orderData = {
        items: cart,
        total: totalAmount,
        shippingDetails,
      };

      await placeOrder(orderData);
      alert("Order placed successfully!");
      removeFromCart(); // Clear cart after placing order
      navigate("/orders");
    } catch (error) {
      console.error("Order Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="border-b py-2">
              {item.productname} - ₹{item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-3">Total: ₹{totalAmount}</h3>
      </div>

      {/* Shipping Details Form */}
      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP Code" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" className="w-full p-2 border" onChange={handleChange} required />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
