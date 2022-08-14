import React, { useEffect, useState } from "react";
import MainTest from "./components/MainTest";
import Navbar from "./components/Navbar";

function App() {
  const [number, setNumber] = useState();
  const [id, setId] = useState(1);
  return (
    <div className="w-full">
    <Navbar id={id} number={number}/>
    <MainTest id={id} setId={setId} number={number} setNumber={setNumber}/>
    </div>
  );
}

export default App;
