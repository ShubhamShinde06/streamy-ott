import mongoose from 'mongoose'
  
  const SeriesSchema = new mongoose.Schema({
    image:{ type: Array, required: true },
    poster:{type: Boolean},
    series_name: { type: String, required: true },
    genre: {type: [Array], required: true},
    description: { type: String, required: true },
    release_year_start: { type: Number },
    total_seasons: { type: Number, required: true },
    rating: {type: Number},
    director: {type: String},
    characters: {type: [Array],required: true,},
    seasons: {
      type: [
        {
          season_number: { type: Number, required: true },
          release_year: { type: Number, required: true },
          episodes: [
            {
              episode_number: { type: Number, required: true },
              title: { type: String, required: true },
              videoLink: { type: String, required: true },
              downloadLink: {type: String,required: true,},
              runtime_minutes: { type: Number, required: true },
              plot: { type: String, required: true },
            }
          ],
        }
      ],
      default: [],
    },
    
  });

  
  
 export const seriesModle = mongoose.models.web_series || mongoose.model('web_series', SeriesSchema);