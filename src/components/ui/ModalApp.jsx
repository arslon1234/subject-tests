import React,{useState, useEffect} from 'react'
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius:'10px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 7px 5px #ccc'
  },
};
const ModalApp = ({modalIsOpen,afterOpenModal,closeModal,correct,number,setActive}) => {
  const [percent, setPercent] = useState('')
  useEffect(()=>{
    setPercent(Math.floor(((correct.length / number)*100)))
  },[])
  const GoHome =()=>{
    closeModal()
    localStorage.removeItem('active')
    localStorage.removeItem('number')
    localStorage.removeItem('category')
    window.location.reload()
  }
  return (
    <Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div className='w-[500px] h-[250px] flex flex-col items-center justify-around'>
    <p className='font-bold text-gray-700 text-3xl'>Your Results</p>
    <p className='font-base text-gray-500 text-2xl mt-2'>{correct.length}/{number}</p>
    <p className='font-base text-gray-500 text-2xl my-1'>or</p>
    <p className='font-base text-gray-500 text-2xl mt-2'>{percent}%</p>
    <div className='w-full mt-1 flex items-center justify-between flex-wrap'>
    <button onClick={closeModal} className='w-[49%] h-[35px] border-[1px] rounded-[5px] text-cyan-500 hover:text-white hover:bg-cyan-500 ease-in duration-300'>OK</button>
    <button onClick={GoHome} className='w-[49%] h-[35px] border-[1px] rounded-[5px] text-red-400 hover:text-white hover:bg-red-400 ease-in duration-300'>GO HOME</button>
    </div>
    </div>
  </Modal>
  )
}

export default ModalApp