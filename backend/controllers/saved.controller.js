import { userModel } from "../models/user.model.js";

export const saveContent = async (req, res) => {
  try {
    
    const {userId, itemId} = req.body

    const user = await userModel.findById(userId)

    if (!user) {
        return res.json({
          message: "User not found!",
        });
    }

    const isSaved = await user.saved.some((b) => b === itemId);
    
    if (!isSaved) {
        await userModel.findByIdAndUpdate(user._id, {
          $push: { saved: itemId },
        });
    } else {
        await userModel.findByIdAndUpdate(user._id, {
          $pull: { saved: itemId },
        });
    }

      res.status(201).json({data: isSaved ? "Post unsaved" : "Post saved"});

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeSavedContent = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSavedContent = async (req, res) => {

    try {
        const {userId} = req.body;
    
        const user = await userModel.findById(userId);
    
        if (!user) {
          return res.json({
            message: "User not found",
          });
        }
    
        res.status(200).json({data: user.saved});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
