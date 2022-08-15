import React, { useEffect, useState } from "react";
import MainTest from "./components/MainTest";
import Navbar from "./components/Navbar";

function App() {
  let subtitle;
  const [number, setNumber] = useState();
  const [id, setId] = useState(1);
  const [active, setActive] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [func, setFunc] = useState(true)
  
  useEffect(()=>{
    if(localStorage.getItem('number')){
      setNumber(localStorage.getItem('number'))
    }
    setActive(localStorage.getItem("active"))
  },[])
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="w-full">
    <Navbar active={active} func={func} setFunc={setFunc} openModal={openModal} id={id} number={number}/>
    <MainTest subtitle={subtitle} modalIsOpen={modalIsOpen} closeModal={closeModal} afterOpenModal={afterOpenModal} active={active} setActive={setActive} id={id} setId={setId} number={number} setNumber={setNumber}/>
    </div>
  );
}

export default App;
