import { v2 as cloudinary } from "cloudinary";
import { movieModel } from "../models/movie.model.js";

export const uploadMovie = async (req, res) => {
  const {
    title,
    release_year,
    runtime_minutes,
    director,
    genre,
    plot,
    rating,
    video_link,
    download_link,
    characters,
    poster
  } = req.body;

  try {

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

    const movieData = {
      title,
      image: imagesUrl,
      release_year,
      runtime_minutes,
      director,
      genre : parsedGenre,
      plot,
      rating,
      video_link,
      download_link,
      characters : parsedCharacters,
      poster: poster === "true" ? true : false
    };

    const movie = new movieModel(movieData)
    await movie.save()

    res.status(201).json({
        success: true,
        message: "Movie Added",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down uploadMovie",
    });
  }
};

export const getMovies = async (req, res) => {
  try {
    
    const movies = await movieModel.find()
    res.status(200).json({
      success: true,
      movies,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server down getMovies",
    });
  }
}
