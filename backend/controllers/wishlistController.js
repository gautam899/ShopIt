import userModel from "../models/userModel.js";

const addToWishlistController = async (req, res) => {
  try {
    const { userId, productId, size } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //check if the items is already in the wishlist.
    const existing = user.wishlist.find(
      (item) => item.productId.toString() === productId && item.size === size
    );
    if (!existing) {
      user.wishlist.push({ productId, size });
      await user.save();
      res
        .status(200)
        .json({ message: "Product added to the wishlist successfully." });
    } else {
      res.status(200).json({ message: "Existing is true" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const fetchWishlist = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId).populate({
      path: "wishlist.productId",
      select: "name image price",
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    // Properly initialize the wishlist variable
    let wishlist = [];

    if (user.wishlist && user.wishlist.length > 0) {
      wishlist = user.wishlist.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        image: item.productId.image,
        price: item.productId.price,
        size: item.size,
      }));
    }
    res.status(200).json({
      message: "Wishlist fetched successfully",
      wishlist,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteWishlistById = async (req, res) => {
  try {
    const { userId, size } = req.body;
    const productId = req.params.productId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    const itemIndex = user.wishlist.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex !== -1) {
      user.wishlist.splice(itemIndex, 1); // Remove the item at the found index
      await user.save();
      res
        .status(200)
        .json({ message: "Item removed from wishlist successfully" });
    } else {
      res.status(404).json({ message: "Item not found in wishlist" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { addToWishlistController, fetchWishlist, deleteWishlistById };
