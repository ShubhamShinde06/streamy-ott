import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const server = "https://streamy-ott-backend.onrender.com"
export const FrontendContext = createContext()

const FrontendContextProvider = (props) => {

    const [loading, setLoading] = useState(false)

    const [allData, setAllData] = useState([])
    const [new_release, setNew_release] = useState([])
    const [posterdata, setPosterData] = useState([])
    const [moviedata, setMovieData] = useState([])
    const [seriesData, setSeriesData] = useState([])
    const [comdeyData, setComdeyData] = useState([])
    const [actionData, setActionData] = useState([])
    const [animationData, setAnimationData] = useState([])
    const [crimeData, setCrimeData] = useState([])
    const [dramaData, setDramaData] = useState([])
    const [fantasyData, setFantasyData] = useState([])
    const [historicalData, setHistoricalData] = useState([])
    const [horrorData, setHorrorData] = useState([])
    const [romanceData, setRomanceData] = useState([])
    const [sci_fiData, setSci_fiData] = useState([])
    const [thrillerData, setThrillerData] = useState([])

    const getContent = async () => {
        setLoading(true)
        try {
            const response = await axios.get(server + '/api/mix/get-mix')
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
                const romanceData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Romance"))
                );
                const sci_fiData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Science-fiction"))
                );
                const thrillerData = response.data.data.content.filter((item) =>
                    item.genre.some((g) => g.includes("Thriller"))
                );

                setCrimeData(crimeData)
                setAnimationData(animationData)
                setComdeyData(comedyData)
                setActionData(actionData)
                setDramaData(dramaData)
                setFantasyData(fantasyData)
                setHistoricalData(historicalData)
                setHorrorData(horrorData)
                setRomanceData(romanceData)
                setSci_fiData(sci_fiData)
                setThrillerData(thrillerData)
                setLoading(false)
                setAllData(sortedContent)

                setPosterData(poster.slice(0,7))
                setNew_release(sortedContent.slice(0,7))
                setMovieData(movie.slice(0,7))
                setSeriesData(series.slice(0,7))
            } else {
                //toast.error(response.data.message)
                console.log(response.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
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
        setCrimeData,
        dramaData, 
        setDramaData,
        fantasyData, 
        setFantasyData,
        historicalData, 
        setHistoricalData,
        horrorData, 
        setHorrorData,
        romanceData, 
        setRomanceData,
        sci_fiData, 
        setSci_fiData,
        thrillerData, 
        setThrillerData,
        loading,
        setLoading
    }

    return(
        <FrontendContext.Provider value={value}>
            {props.children}
        </FrontendContext.Provider>
    )


}

export default FrontendContextProvider
