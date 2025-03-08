import { Product } from "../model/product.model.js";
import cloudinary from "../config/cloudinary.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    console.log("hello")
    const { name, description, price,category,stock } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock,
      user: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Get single product
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await cloudinary.uploader.destroy(product.image); // Delete image from Cloudinary
  await product.deleteOne();

  res.json({ message: "Product deleted" });
};
//update product
export const updateProduct = async (req, res) => {
  
  const productId  = req.params.id;
  const { name, description, price } = req.body;
  let image;

  try {
    // Upload image to Cloudinary if a new image is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, image },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const getProductByCategory = async(req,res)=>{
  try {
    const cat = req.params.cat;
    const products = await Product.find({category : cat})
    return res.json({
      success : true,
      message : "product get by category",
      products
    })
    console.log(cat)
  } catch (error) {
    res.status(500).json({ message: 'Error getting product', error });
  }
}