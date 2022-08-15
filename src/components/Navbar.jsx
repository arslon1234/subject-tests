import React from 'react'
const Navbar = ({active, openModal,setFunc,func,id,number}) => {
  return (
    <div className='w-full h-[70px] bg-[#F8F9FA] flex items-center justify-around'>
        <span className='text-lg font-bold text-gray-700' >Final Exam</span>
       {
        active ?  <span className='font-base text-gray-700 text-2xl'>{id}/{number}</span> :null
       }
        {
          active ? <button onClick={func ? ()=>(openModal(), setFunc(false)) : null} className={func ? 'py-3 px-5 rounded-[8px] bg-red-500 text-white font-base' : 'py-3 px-5 rounded-[8px] bg-red-300 text-white font-base'}>
            {func ? 'Finish' : "Finished"}
          </button> : null
        }
        
    </div>
  )
}

export default Navbar