import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-lg">
            {/* Product Image */}
            <img src={product.image1} alt={product.productname} className="w-full h-48 object-cover rounded-lg" />

            {/* Product Details */}
            <h3 className="text-lg font-semibold mt-2">{product.productname}</h3>
            <div className="flex items-center space-x-2">
              {product.oldprice && <span className="line-through text-gray-500">₹{product.oldprice}</span>}
              <span className="text-orange-600 font-bold">₹{product.price}</span>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-between">
              <Link to={`/product/${product._id}`} className="bg-blue-500 text-white px-3 py-2 rounded-lg">View</Link>
              <button onClick={() => addToCart(product)} className="bg-green-500 text-white px-3 py-2 rounded-lg">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
