import axios from "axios";
import React, { useEffect, useState } from "react";
import Answers from "./Answers";
import './answer.css'
const MainTest = ({ id, number, setId, setNumber }) => {
  const [category, setCategory] = useState();
  const [tests, setTests] = useState([]);
  const [active, setActive] = useState(false);
  const [select, setSelect] = useState();
  const [result, setResult] = useState();
  const [count, setCount] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [find_ans, setFind_ans] = useState(false)
  const changeNumber = (e) => {
    setNumber(e.target.value);
  };
  const changeCategory = (e) => {
    setCategory(e.target.value);
  };
  const GetTests = () => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=medium&type=multiple`
      )
      .then((res) => {
        res.data.results.forEach((item, index) => {
          item.id = index + 1;
          item.selected = false;
          let a = Math.floor(
            Math.random() * (item.incorrect_answers.length + 1)
            );
            item.incorrect_answers.splice(a, 0, item.correct_answer);
            // console.log(item, "item")
          });
        setTests(res.data.results);
      });
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

  };
  const selectAnswer = (event,id,answer)=> {
      let active = document.querySelector(".active")
      if(active){
        active.classList.remove("active")
      }
      event.target.classList.add("active")
      let data = tests.filter(item=>item.id == id)
      data[0].selected = true
      data[0].selectedAnswer = answer
  }
  const submitAnswer = (correct_answer, selected) => {
    selected= false
    setSubmit(false)
    if (select === correct_answer) {
      setResult(correct_answer)
      console.log("tugri");
    } else {
      console.log("xato");
    }
  };
  console.log(tests);
  const getFunction = () => {
    GetTests();
    setActive(true);
  };
  useEffect(()=>{

  },[tests])
  return (
    <div className="w-full flex items-center justify-center">
      {active ? (
        <div className="w-[700px] p-3 m-5">
          <div className="w-full flex flex-wrap items-center justify-center">
            {tests?.map((item, index) => {
              return (
                <div key={item.id}>
                  <p
                    onClick={(event) => ClickId(event,item.id)}
                    className={
                     item.selected
                        ? "py-2 px-6 border-[1px] bg-gray-500 cursor-pointer "
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
                  let data = item
                  return (
                    <div className="w-full">
                      <div className="bg-[#F7F7F7] py-3 px-3 text-lg text-black font-semibold">
                        <p>
                          <span>{item.id}. </span>
                          {item.question}
                        </p>
                      </div>
                      <div className="w-full">
                        <div className="w-full">
                          {item.incorrect_answers.map((answer, i) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  onClick={(event)=> selectAnswer(event,item.id,answer)}
                                  className={item?.selectedAnswer == answer ? "p-2 cursor-pointer bg-gray-300 hover:bg-gray-200" :"p-2 cursor-pointer hover:bg-gray-200"}
                                >
                                  {answer}
                                  {data?.selected}
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-around border-t-[1px] py-3 px-2">
                        <button
                          className="py-2 px-3 bg-lime-500 rounded-[7px] text-white"
                          onClick={
                            id > 1 ? () => setId((prev) => prev - 1) : null
                          }
                        >
                          PREVIOUS
                        </button>
                        <button
                          className={submit ? "py-2 px-3 bg-gray-400 rounded-[7px] text-white" : "py-2 px-3 bg-gray-300 rounded-[7px] text-white"}
                          onClick={submit ? () => submitAnswer(item.correct_answer, item.selected) : null}
                        >
                          SUBMIT
                        </button>
                        <button
                          className="py-2 px-3 bg-blue-600 rounded-[7px] text-white"
                          onClick={
                            id < number ? () => setId((prev) => prev + 1) : null
                          }
                        >
                          NEXT
                        </button>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="w-full py-2 items-center">
                There is anything...
              </div>
            )}
          </div>
          <button onClick={() => setActive(false)}>go home</button>
        </div>
      ) : (
        <div className="w-[700px] h-[500px] p-3 m-5">
          <select
            onChange={changeNumber}
            className="w-full h-[40px] border-[2px] outline-none mt-2"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <select
            onChange={changeCategory}
            className="w-full h-[40px] border-[2px] outline-none mt-2"
          >
            <option value="18">Science: Computers</option>
            <option value="11">Entertainment: Film</option>
            <option value="19">Science: Mathematics</option>
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
            onClick={getFunction}
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
