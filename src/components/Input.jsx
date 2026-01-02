import React, { useContext } from 'react'
import { SearchContext } from '../context/SearchContext';
const Input = () => {
  const {query,setQuery} = useContext(SearchContext)
  return (
    <div className='flex justify-center mt-4'>
        <input type="text" className='md:w-[50%] w-full bg-white text-black p-3 rounded-3xl' value={query} onChange={(e)=>setQuery(e.target.value)}/>
    </div>
  )
}

export default Input