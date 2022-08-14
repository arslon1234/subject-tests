import React,{useEffect, useRef, useState} from "react";
import './answer.css'
const Answers = ({answer,index, correct_answer,incorrect_answers,setSelect,result}) => {
    const [click, setClick] = useState(true)
    const [count, setCount] = useState(null)
    {
      /* className={fun(item, item.incorrect_answers, answer, i).falseValue && fun(item, item.incorrect_answers, answer, i).falseValue === i ? 'bg-lime-400 p-2 hover:bg-slate-200 cursor-pointer' : 'bg-blue-500 p-2 hover:bg-slate-200 cursor-pointer'} */
    }
     // function fun(parentObj, answers, selectedAnswer, i) {
  //     if(i === answers.indexOf(selectedAnswer)) {
  //       return {
  //         trueValue: i,
  //         falseValue: false
  //       }
  //     } else {
  //       const trueValue = answers.indexOf(parentObj.correct_answer)
  //       return {
  //         trueValue: trueValue,
  //         falseValue: i
  //       }
  //     }
  //   }
    {/* <Answers result={result} answer={answer} index={i} incorrect_answers={item.incorrect_answers} correct_answer={item.correct_answer} select={select} setSelect={setSelect}/> */}
    const findAnswer =(answer,index)=>{
      setCount(index)
      setSelect(answer)
        // if(incorrect_answers.indexOf(answer) === index){
        //     console.log(answer, "answer");
        // }else{
        //     setClick(false)
        // }
    }
    // useEffect(()=>{
    //   findAnswer()
    // },[])
  return (
    <div
    key={index}
    onClick={() =>setCount(index)}
    className={count === index ? "yes" : "no"}
    >
      {answer}
      {count}
    </div>
  );
};
export default Answers;
