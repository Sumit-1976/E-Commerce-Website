const addToCartModel = require("../../models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId; 
    const addToCartProductId = req.body._id; 

    const deleteProduct = await addToCartModel.deleteOne({
      _id: addToCartProductId,
      userId: currentUserId
    });

    if (deleteProduct.deletedCount === 0) {
      return res.json({
        message: "No product found or you do not have access to delete this item.",
        error: true,
        success: false
      });
    }

    return res.json({
      message: "Product deleted from cart!",
      error: false,
      success: true,
      data: deleteProduct
    });
  } catch (error) {
    return res.json({
      message: error?.message || error,  
      error: true,
      success: false
    });
  }
};

module.exports = deleteAddToCartProduct;
