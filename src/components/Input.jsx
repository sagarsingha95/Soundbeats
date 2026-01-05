import React, { useContext, } from 'react'
import { SearchContext } from '../context/SearchContext';
import { FaMusic } from 'react-icons/fa';
const Input = () => {
  const {query,setQuery} = useContext(SearchContext)



  return (
    <div className='flex justify-center mt-4 p-3 flex-col items-center'>

        <input type="text" className='md:w-[50%] w-full bg-white text-sm pl-10 p-3 rounded-2xl text-gray-400' value={query} onChange={(e)=>setQuery(e.target.value)}/>
    </div>
  )
}

export default Input