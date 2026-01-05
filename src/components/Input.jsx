import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/SearchContext';
import { FaMusic } from 'react-icons/fa';
const Input = () => {
  const {query,setQuery} = useContext(SearchContext)
  const [logo,setLog] = useState(window.innerWidth <= 764)

  useEffect(()=>{
    const handleSize = ()=>{
        setLog(window.innerWidth <= 764)
    };  
    window.addEventListener('resize',handleSize);
    return () => window.removeEventListener('resize',handleSize)
  },[])
  return (
    <div className='flex justify-center mt-4 p-3 flex-col items-center'>
      {logo &&  <h1 className="text-[20px] font-bold flex items-center gap-2 pb-4 !text-4xl bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
                  <FaMusic color="green"/> Sound Beats
                </h1> }
        <input type="text" className='md:w-[50%] w-full bg-white text-sm pl-10 p-3 rounded-2xl text-gray-400' value={query} onChange={(e)=>setQuery(e.target.value)}/>
    </div>
  )
}

export default Input