import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById, updateProduct } from "../services/productService";

const AdminEditProduct = () => {
  const { id } = useParams(); // Get Product ID from URL
  const navigate = useNavigate();

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

  // Load product details when component mounts
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    loadProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // Submit form to update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, productData);
      alert("Product updated successfully!");
      navigate("/admin/products"); // Redirect to product list
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="productname" value={productData.productname} placeholder="Product Name" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="price" value={productData.price} placeholder="Price" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="oldprice" value={productData.oldprice} placeholder="Old Price (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <textarea name="description" value={productData.description} placeholder="Description" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="category" value={productData.category} placeholder="Category" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="quantity" value={productData.quantity} placeholder="Quantity" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="stock" value={productData.stock} placeholder="Stock Status (In Stock / Out of Stock)" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="image1" value={productData.image1} placeholder="Image 1 URL" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="image2" value={productData.image2} placeholder="Image 2 URL (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <input type="text" name="image3" value={productData.image3} placeholder="Image 3 URL (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <input type="text" name="image4" value={productData.image4} placeholder="Image 4 URL (Optional)" className="w-full p-2 border" onChange={handleChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Product</button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
