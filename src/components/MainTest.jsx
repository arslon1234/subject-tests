import axios from "axios";
import React, { useState,useEffect } from "react";
import './answer.css'
import Question from "./Question";
import ModalApp from "./ui/ModalApp";
const MainTest = ({ id, number, setId, setNumber,setActive,active,modalIsOpen,closeModal,afterOpenModal,subtitle }) => {
  const [category, setCategory] = useState();
  const [tests, setTests] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [selectIndex, setSelectIndex] = useState(null)
  const [correct, setCorrect] = useState([])
  const [refresh, setRefresh] = useState(null)
  const changeNumber = (e) => {
    setNumber(e.target.value);
  };
  const changeCategory = (e) => {
    setCategory(e.target.value);
  };
  const ClickId = (event,ID) => {
    let activeEl = document.querySelector(".activeEl")
    let active = document.querySelector(".active")
    if(activeEl){
      activeEl.classList.remove("activeEl")
    }
    if(active){
      active.classList.remove("active")
    }
    event.target.classList.add("activeEl")
    setId(ID);
    setSelectedAnswer(null)
    setSelectIndex(null)
  };
   const selectAnswer = (event,item,answer,index)=> {
    setSelectIndex(index)
    item.selectAnswer = answer
    let active = document.querySelector(".active")
    if(active){
      active.classList.remove("active")
    }
    event.target.classList.add("active")
    let data = tests.filter(test=>test.id === item.id)
    setSelectedAnswer(data[0].selectedAnswer = answer)
    setSelectIndex(index)
}
  const submitAnswer = (item) => {
    item.trueAnswer = item.incorrect_answers.indexOf(item.correct_answer)
    if(item.trueAnswer !== selectIndex){
      item.selectAnswerIndex = selectIndex
    }
    if(item.correct_answer === item.selectAnswer){
      correct.push(item.correct_answer)
    }
    item.selected = true
    setSelectedAnswer(null)
  };
const GetTests = (num,cat) => {
  axios
    .get(
      `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=medium&type=multiple`
    )
    .then((res) => {
      const data = res.data.results.map((item, index) => {
        item.id = index + 1;
        item.selected = false;
        item.selectAnswerIndex = null
        item.selectAnswer = null
        item.trueAnswer = null
        let a = Math.floor(
          Math.random() * (item.incorrect_answers.length + 1)
          );
          item.incorrect_answers.splice(a, 0, item.correct_answer);
          return item
        });
      setTests(data);

    });
};
  const getFunction = () => {
    GetTests(number,category);
    setActive(true);
    localStorage.setItem('active', true)
    localStorage.setItem('number', number)
    localStorage.setItem('category', category)
  };
  useEffect(()=>{
    if(localStorage.getItem('category')){
      setCategory(localStorage.getItem('category'))
      GetTests(localStorage.getItem('number'),localStorage.getItem('category'))
    }
  },[])
  return (
    <div className="w-full flex items-center justify-center">
    <ModalApp setActive={setActive} correct={correct} number={number} subtitle={subtitle} modalIsOpen={modalIsOpen} afterOpenModal={afterOpenModal} closeModal={closeModal}/>
      {active ? (
        <div className="w-[700px] p-3 m-5">
          <div className="w-full flex flex-wrap items-center justify-center">
            {tests?.map((item, index) => {
              return (
                <div key={item.id}>
                  <p
                    onClick={(event) => ClickId(event,item.id)}
                    className={
                     item.id === id
                        ? "py-2 px-6 border-[1px] bg-gray-500 cursor-pointer" 
                        : "py-2 px-6 border-[1px] cursor-pointer hover:bg-slate-100"
                    }
                  >
                    {item.id}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-full border-[1px] rounded-[8px] mt-3">
            {tests.length > 0 ? (
              tests
                .filter((item) => item.id === id)
                .map((item, index) => {
                  return (
                   <>
                    <Question selectAnswer={selectAnswer} selectedAnswer={selectedAnswer} submitAnswer={submitAnswer} item={item} index={index} id={id} setId={setId} setNumber={setNumber} number={number}/>
                   </>
                  );
                })
            ) : (
              <div className="w-full py-5 items-center justify-center">
                There is anything...
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-[700px] h-[500px] p-3 m-5">
          <select
            onChange={changeNumber}
            className="w-full h-[40px] border-[2px] outline-none mt-2"
          >
           <option hidden selected disabled>
                Select question number....
              </option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
          <select
            onChange={changeCategory}
            className="w-full h-[40px] border-[2px] outline-none mt-2"
          >
           <option hidden selected disabled>
                Select category...
              </option>
            <option value="18">Science: Computers</option>
            <option value="11">Entertainment: Film</option>
            <option value="10">Entertainment: Books</option>
            <option value="23">History</option>
          </select>
          <button
            onClick={getFunction}
            className="bg-[#28A745] w-full h-[40px] mt-3 rounded-[8px] text-white"
          >
            START
          </button>
          <button
            className="bg-blue-500 w-full h-[40px] mt-3 rounded-[8px] text-white"
          >
            TESTS
          </button>
        </div>
      )}
     
    </div>
  );
};

export default MainTest;
