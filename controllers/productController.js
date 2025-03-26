const Product = require("../models/Product");

//Thêm sản phẩm
exports.addProduct = async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    const product = new Product({ name, price, category, description, image });
    await product.save();
    res.status(201).json({ message: "Sản phẩm đã được thêm", product });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm sản phẩm" });
  }
};

//Lấy danh sách sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

//Sửa sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm" });
  }
};

//Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Sản phẩm đã bị xóa" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
  }
};

//Tìm kiếm sản phẩm theo tên
exports.searchProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};

    if (search) {
      filter.name = { $regex: new RegExp(search, "i") }; // Regex tìm kiếm không phân biệt hoa thường
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm sản phẩm" });
  }
};
