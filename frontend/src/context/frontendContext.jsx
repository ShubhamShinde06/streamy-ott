import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const FrontendContext = createContext()

const FrontendContextProvider = (props) => {

    const [allData, setAllData] = useState([])
    const [new_release, setNew_release] = useState([])
    const [posterdata, setPosterData] = useState([])
    const [moviedata, setMovieData] = useState([])
    const [seriesData, setSeriesData] = useState([])
    const [comdeyData, setComdeyData] = useState([])
    const [actionData, setActionData] = useState([])
    const [animationData, setAnimationData] = useState([])
    const [crimeData, setCrimeData] = useState([])

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
                const comedyData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Comedy"))
                );
                const actionData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Action"))
                );
                const animationData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Animation"))
                );
                const crimeData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Crime"))
                );
                const dramaData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Drama"))
                );
                const fantasyData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Fantasy"))
                );
                const historicalData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Historical"))
                );
                const horrorData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Horror"))
                );
                const Data = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Horror"))
                );

                setCrimeData(crimeData)
                setAnimationData(animationData)
                setComdeyData(comedyData)
                setActionData(actionData)
                
                setAllData(sortedContent)

                setPosterData(poster.slice(0,7))
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
        setSeriesData,
        comdeyData, 
        setComdeyData,
        actionData, 
        setActionData,
        animationData, 
        setAnimationData,
        crimeData,
        setCrimeData
    }

    return(
        <FrontendContext.Provider value={value}>
            {props.children}
        </FrontendContext.Provider>
    )


}

export default FrontendContextProvider