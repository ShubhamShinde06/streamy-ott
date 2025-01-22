import { v2 as cloudinary } from "cloudinary";
import { seriesModle } from "../models/webseries.model.js";
import mongoose from "mongoose";

export const uploadSeries = async (req, res) => {
  const {
    poster,
    series_name,
    genre,
    description,
    release_year_start,
    total_seasons,
    seasons,
    characters,
    rating,
    director
  } = req.body;
  try {
    const parsedSeasons = JSON.parse(seasons);
    const parsedGenre = JSON.parse(genre);
    const parsedCharacters = JSON.parse(characters);

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];

    const images = [image1, image2].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const seriesData = {
      poster: poster === "true" ? true : false,
      series_name,
      genre: parsedGenre,
      description,
      release_year_start,
      total_seasons,
      image: imagesUrl,
      rating,
      director,
      seasons: parsedSeasons,
      characters: parsedCharacters,
    };

    const series = new seriesModle(seriesData);
    await series.save();

    res.status(201).json({
      success: true,
      message: "Series Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down uploadSeries",
    });
  }
};

export const getSeries = async (req, res) => {
  try {
    const series = await seriesModle.find();
    res.status(200).json({
      success: true,
      series,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down uploadSeries",
    });
  }
};

export const deleteSeries = async (req, res) => {
  try {
      
      const { id } = req.params;
  
      const series = await seriesModle.findByIdAndDelete(id)
  
      if(!series){
        res.status(404).json({
          success:false,
          message:"series not found!"
        })
      }
  
      res.json({
        success: true,
        message: "series deleted",
      });
  
    } catch (error) {
      res.status(500).json({ message: 'Error deleteSeries like', error });
    }
};

export const singleSeries = async (req, res) => {
  try {
    const { id } = req.params;

    const series = await seriesModle.findById(id);
    res.json({
      success: true,
      series,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in singleSeries",
    });
  }
};

export const updateSeries = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid series ID" });
    }

    const updatedSeries = await seriesModle.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSeries) {
      return res.status(404).json({ error: "series not found" });
    }
    return res.status(200).json({
      success: true,
      message: "updated",
      updatedSeries,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error updateMovie",
    });
  }
};
