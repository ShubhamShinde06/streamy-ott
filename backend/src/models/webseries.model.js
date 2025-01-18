import mongoose from 'mongoose'


const EpisodeSchema = new mongoose.Schema({
    episode_number: { type: Number, required: true },
    title: { type: String, required: true },
    videoLink: { type: String, required: true },
    // release_date: { type: Date, required: true },
    runtime_minutes: { type: Number, required: true },
    plot: { type: String, required: true }
  });
  
  const SeasonSchema = new mongoose.Schema({
    season_number: { type: Number, required: true },
    release_year: { type: String, required: true },
    episodes:{ type:[EpisodeSchema], default: []}
  });
  
  const SeriesSchema = new mongoose.Schema({
    image:{ type: Array, required: true },
    poster:{type: Boolean},
    series_name: { type: String, required: true },
    genre: {type: [String], required: true},
    description: { type: String, required: true },
    release_year_start: { type: Number },
    total_seasons: { type: Number, required: true },
    rating: {type: Number},
    director: {type: String},
    characters: {type: [String],required: true,},
    seasons: {
      type: [Object],
    },
    
  });

  
  
 export const seriesModle = mongoose.models.web_series || mongoose.model('web_series', SeriesSchema);