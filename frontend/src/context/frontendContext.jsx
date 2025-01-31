import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const FrontendContext = createContext()

const FrontendContextProvider = (props) => {

    const [allData, setAllData] = useState([])
    const [new_release, setNew_release] = useState([])
    const [posterdata, setPosterData] = useState([])
    const [moviedata, setMovieData] = useState([])
    const [seriesData, setSeriesData] = useState([])

    const getContent = async () => {
        try {
            const response = await axios.get('/api/mix/get-mix')
            if(response.data.success){
                const sortedContent = response.data.data.content.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                const poster = response.data.data.content.filter(
                    (item) => item.poster === true
                );
                const movie = response.data.data.content.filter(
                    (item) => item.category === 'movie'
                );
                const series = response.data.data.content.filter(
                    (item) => item.category === 'series'
                );
                setPosterData(poster)
                setAllData(sortedContent)
                setNew_release(sortedContent.slice(0,7))
                setMovieData(movie.slice(0,7))
                setSeriesData(series.slice(0,7))
            } else {
                //toast.error(response.data.message)
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
            //toast.error(error.message);
        }
    }
    useEffect(()=>{
        getContent()
    },[])

    const value = {
        allData, 
        setAllData,
        new_release, 
        setNew_release,
        posterdata, 
        setPosterData,
        moviedata, 
        setMovieData,
        seriesData, 
        setSeriesData
    }

    return(
        <FrontendContext.Provider value={value}>
            {props.children}
        </FrontendContext.Provider>
    )


}

export default FrontendContextProvider