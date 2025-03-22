import { Product } from "../model/product.model.js";
import cloudinary from "../config/cloudinary.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, isFlash } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path)



    if (!name || !price) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: result.secure_url,
      stock,
      user: req.user._id,
      isFlash: false
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


export const flashSale = async (req, res) => {
  const products = await Product.find({ isFlash: true })
  res.json(products)
}

// Get single product
export const getProductById = async (req, res) => {
  const id = req.params.id.split(":")[1]
  const product = await Product.findById(id);
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
  const productId = req.params.id;
  const { name, description, price, stock, category,isFlash } = req.body;
  let image;

  try {
    // Upload image to Cloudinary if a new image is provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, image, category, stock,isFlash },
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

export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const products = await Product.find({ category: category })
    return res.json({
      success: true,
      message: "product get by category",
      products
    })
  } catch (error) {
    res.status(500).json({ message: 'Error getting product', error });
  }
}