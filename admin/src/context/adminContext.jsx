import { createContext, useState } from "react";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [sideMenu, setSideMenu] = useState(false)
    const [loading, setLoading] = useState(false)

    const value = {
        sideMenu, 
        setSideMenu,
        loading, 
        setLoading
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider