import React, {useContext} from 'react'
const Navbar = ({id,number}) => {
  return (
    <div className='w-full h-[70px] bg-[#F8F9FA] flex items-center justify-center'>
        <span className=' text-lg font-bold text-gray-700'>Final Exam</span>
        {/* <span>{id > 1 ? id : ""}{number ?? number}</span> */}
    </div>
  )
}

export default Navbar