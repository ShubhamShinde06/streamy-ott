import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [sideMenu, setSideMenu] = useState(false)
    const [loading, setLoading] = useState(false)
    const [contentData, setContentData] = useState([])

    const getContent = async () => {
        try {
            const response = await axios.get('/api/mix/get-mix')
            if(response.data.success){
                setContentData(response.data.data.content)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getContent()
    },[])

    const value = {
        sideMenu, 
        setSideMenu,
        loading, 
        setLoading,
        contentData, 
        setContentData
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider