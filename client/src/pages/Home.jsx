import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import SliderBottom from "../components/SliderBottom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.slice(0, 8)); // Show only first 8 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div>
        
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="mt-6">
        <Link to="/products" className="bg-orange-500 text-white px-4 py-2 rounded-lg">View More Products</Link>
      </div>
      <SliderBottom/>
    </div>
  );
};

export default Home;
