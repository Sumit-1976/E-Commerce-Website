const addToCartModel = require("../../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const cartItem = await addToCartModel.findOne({
      _id: addToCartProductId,
      userId: currentUserId
    });

    if (!cartItem) {
      return res.json({
        message: "No product found or you do not have access to modify this cart item.",
        error: true,
        success: false
      });
    }

    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId, userId: currentUserId },
      { $set: { quantity: qty } }
    );

    return res.json({
      message: "Quantity updated successfully!",
      data: updateProduct,
      error: false,
      success: true
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

module.exports = updateAddToCartProduct;
