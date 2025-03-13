import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <Link to="/admin/products/create" className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 inline-block">
        + Add New Product
      </Link>
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border p-2">
                <img src={product.image1} alt={product.productname} className="h-16 w-16 object-cover mx-auto" />
              </td>
              <td className="border p-2">{product.productname}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">₹{product.price} <span className="text-gray-500 line-through">₹{product.oldprice}</span></td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2 space-x-2">
                <Link to={`/admin/products/edit/${product._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
