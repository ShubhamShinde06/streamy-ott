import React, { useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import Sidebar from './Sidebar'
import axios from 'axios'
import { server } from '../App'
import { useUserStore } from '../store/userStore'
import { toast } from 'react-toastify'
import { format } from "timeago.js";

const Suggest = () => {

  const {user} = useUserStore()

  const userId = user?._id

  const [updateData, setUpdateData] = useState(false)
  const [title, setTitle] = useState('')
  const [data,setData] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${server}api/suggest/add`, { title, userId });
  
      if (response?.data?.success) {
        toast.success(response.data.message);
        setTitle('');
        setUpdateData((prev) => !prev)
      } else {
        toast.success(response?.data?.message);
        setTitle('');
        setUpdateData((prev) => !prev)
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      toast.error("Failed to submit. Please try again later.");
    }
  };

  useEffect(()=>{
    
    if(!userId) return

    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}api/suggest/get/${userId}`);
        setData(response.data.data); // Store fetched data in state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData()
  },[userId, updateData])
  


  return (
    <div className='h-[100vh] lg:h-auto relative z-10'>
      <div className='lg:hidden block'>
        <Sidebar />
      </div>
      
      <header className='w-full h-14 p-2 uppercase flex items-center bg-[#7339E5] '>
        Suggest a new Movie or Web Show
      </header>
      <main className='w-full lg:min-h-[250px] h-auto pl-5 lg:bg-[#070140] bg-transparent overflow-y-scroll show-scroll flex flex-col gap-3 items-end p-5'>
        {
          data.map((item,index) => (
            <>
            <div key={index + 17 } className='flex flex-col gap-1 items-end'>
          <div className='bg-[#7339E5] p-1 rounded-sm'>
            {item.title}
          </div>
          <p className='text-xs text-gray-500'>{format(item.createdAt)}</p>
        </div>
            </>
          ))
        }
        
        
      </main>
      <form onSubmit={handleSubmit} className='w-full h-12 p-2 uppercase flex items-center bg-[#7339E5] absolute bottom-16 lg:bottom-0'>
        <input 
          type="text" 
          placeholder='Enter Title'
          className='bg-transparent flex-1 border-none outline-none text-xl'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <button type='submit' className='w-10 h-10 flex items-center justify-center bg-[#070140] rounded-md cursor-pointer'>
          <IoSend />
        </button>
      </form>
    </div>
  )
}

export default Suggest