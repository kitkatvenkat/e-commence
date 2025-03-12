const Product = require("../models/productModel");
const fs = require("fs");

// ✅ Create New Product
const productCreate = async (req, res) => {
    try {
        // Store uploaded file paths
        const image1 = req.files["image1"] ? req.files["image1"][0].path.replace("\\", "/") : null;
        const image2 = req.files["image2"] ? req.files["image2"][0].path.replace("\\", "/") : null;
        const image3 = req.files["image3"] ? req.files["image3"][0].path.replace("\\", "/") : null;
        const image4 = req.files["image4"] ? req.files["image4"][0].path.replace("\\", "/") : null;

        // Create new product
        const newProduct = new Product({
            productname: req.body.productname,
            price: req.body.price,
            oldprice: req.body.oldprice,
            description: req.body.description,
            image1,
            image2,
            image3,
            image4,
            category: req.body.category,
            quantity: req.body.quantity,
            stock: req.body.stock
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Show All Products
const productshow = async (req, res) => {
    try {
        const productData = await Product.find();
        res.json(productData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Product (with Image Deletion)
const productupdate = async (req, res) => {
    try {
        const { id } = req.params;
        let existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Function to delete old images
        const deleteImage = (filePath) => {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted old image: ${filePath}`);
            }
        };

        // Store new image paths or keep existing ones
        const image1 = req.files["image1"] ? req.files["image1"][0].path.replace("\\", "/") : existingProduct.image1;
        const image2 = req.files["image2"] ? req.files["image2"][0].path.replace("\\", "/") : existingProduct.image2;
        const image3 = req.files["image3"] ? req.files["image3"][0].path.replace("\\", "/") : existingProduct.image3;
        const image4 = req.files["image4"] ? req.files["image4"][0].path.replace("\\", "/") : existingProduct.image4;

        // Delete old images if new images are uploaded
        if (req.files["image1"]) deleteImage(existingProduct.image1);
        if (req.files["image2"]) deleteImage(existingProduct.image2);
        if (req.files["image3"]) deleteImage(existingProduct.image3);
        if (req.files["image4"]) deleteImage(existingProduct.image4);

        // Update product details
        existingProduct.productname = req.body.productname || existingProduct.productname;
        existingProduct.price = req.body.price || existingProduct.price;
        existingProduct.oldprice = req.body.oldprice || existingProduct.oldprice;
        existingProduct.description = req.body.description || existingProduct.description;
        existingProduct.image1 = image1;
        existingProduct.image2 = image2;
        existingProduct.image3 = image3;
        existingProduct.image4 = image4;
        existingProduct.category = req.body.category || existingProduct.category;
        existingProduct.quantity = req.body.quantity || existingProduct.quantity;
        existingProduct.stock = req.body.stock || existingProduct.stock;

        await existingProduct.save();
        res.status(200).json(existingProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Product (with Image Deletion)
const productdelete = async (req, res) => {
    try {
        const { id } = req.params;
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Function to delete images
        const deleteImage = (filePath) => {
            if (filePath && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Deleted product image: ${filePath}`);
            }
        };

        // Delete product images
        deleteImage(product.image1);
        deleteImage(product.image2);
        deleteImage(product.image3);
        deleteImage(product.image4);

        // Delete product from database
        await Product.findByIdAndDelete(id);
        res.json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { productCreate, productshow, productupdate, productdelete };
