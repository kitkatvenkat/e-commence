import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <img src={product.image1} alt={product.productname} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-semibold mt-2">{product.productname}</h3>
      <p className="text-orange-600 font-bold">₹{product.price}</p>
      <div className="mt-2 flex justify-between">
        <button onClick={() => addToCart(product)} className="bg-orange-500 text-white px-3 py-1 rounded">
          Add to Cart
        </button>
        <Link to={`/product/${product._id}`} className="text-blue-500 underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
