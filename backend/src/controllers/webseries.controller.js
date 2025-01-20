import { v2 as cloudinary } from "cloudinary";
import { seriesModle } from "../models/webseries.model.js";

export const uploadSeries = async (req, res) => {
  const {
    poster,
    series_name,
    genre,
    description,
    release_year_start,
    release_year_end,
    total_seasons,
    seasons,
    characters,
  } = req.body;
  try {
   
    const parsedSeasons = JSON.parse(seasons);
    const parsedGenre = JSON.parse(genre);
    const parsedCharacters = JSON.parse(characters)

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
      genre : parsedGenre,
      description,
      release_year_start,
      release_year_end,
      total_seasons,
      image: imagesUrl,
      seasons: parsedSeasons,
      characters : parsedCharacters,
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
    
    const series = await seriesModle.find()
    res.status(200).json({
      success: true,
      series
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down uploadSeries",
    });
  }
}
