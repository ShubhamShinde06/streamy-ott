import { seriesModle } from "../models/webseries.model.js";
import { movieModel } from "../models/movie.model.js";

export const getAllContent = async (req, res) => {
  try {
    const series = await seriesModle.find();
    const movies = await movieModel.find();

    res.status(200).json({
      success: true,
      data: {
        content: [...series, ...movies],
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server down getAllContent",
    });
  }
};

export const countView = async (req, res) => {
  try {
    const { id } = req.params;

    // Try to find the content in movies or series
    const movie = await movieModel.findById(id);
    const series = await seriesModle.findById(id);
    
    const content = movie || series;

    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    // Increment the visit count
    content.visitCount = (content.visitCount || 0) + 1;
    await content.save();

    res.status(200).json({ success: true, visitCount: content.visitCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating visit count",
      error: error.message,
    });
  }
};

export const countLike = async (req, res) => {
  try {

    const { id } = req.params;
    const { liked } = req.body; 

    const movie = await movieModel.findById(id);
    const series = await seriesModle.findById(id);
    
    const content = movie || series;

    if (!content) {
      return res.status(404).json({ success: false, message: "Content not found" });
    }

    if (liked) {
      content.likeCount -= 1;
    } else {
      content.likeCount += 1;
    }
    
    await content.save();
    res.json({ likeCount: content.likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like', error });
  }
}





