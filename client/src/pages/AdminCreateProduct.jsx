import { useState } from "react";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const AdminCreateProduct = () => {
  const [productData, setProductData] = useState({
    productname: "",
    price: "",
    oldprice: "",
    description: "",
    category: "",
    quantity: "",
    stock: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(productData);
      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Create Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="productname" placeholder="Product Name" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="oldprice" placeholder="Old Price (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <textarea name="description" placeholder="Description" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="stock" placeholder="Stock Status (In Stock / Out of Stock)" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="image1" placeholder="Image 1 URL" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="image2" placeholder="Image 2 URL (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <input type="text" name="image3" placeholder="Image 3 URL (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <input type="text" name="image4" placeholder="Image 4 URL (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">Create Product</button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
