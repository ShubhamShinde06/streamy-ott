import mongoose, { Schema } from "mongoose";

const movieSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
  poster:{
    type: Boolean
  },
  title: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  runtime_minutes: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  video_link: {
    type: String,
    required: true,
  },
  characters: {
    type: [String],
    required: true,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "review",
    //required: true,
  },
});

export const movieModel = mongoose.models.movie || mongoose.model("movie", movieSchema);
