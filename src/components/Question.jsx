import React from "react";
const Question = ({
  item,
  index,
  id,
  number,
  setId,
  setNumber,
  selectAnswer,
  submitAnswer,
  selectedAnswer,
}) => {
  const PrevId = () => {
    setId((prev) => prev - 1);
  };
  const getStyle = (selected, answer, item,index) => {
    if(item.trueAnswer === index){
      return {background: "#ADFF2F", cursor: "pointer", padding: "5px", color:'white'}
    }
     if(item.selectAnswerIndex === index){
      return {background: "#FF7F50", cursor: "pointer", padding: "5px", color: 'white'}
    }
    if (selected === answer) {
      return { background: "#999", cursor: "pointer", padding: "5px" };
    } 
    else {
      return { background: "#fff", cursor: "pointer", padding: "5px" };
    }
  };
  return (
    <div className="w-full">
      <div className="bg-[#F7F7F7] py-3 px-3 text-lg text-black font-semibold">
        <p>
          <span>{item.id}.</span>
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
                  onClick={
                    !item.selected
                      ? (event) => selectAnswer(event,item,answer,i)
                      : null
                  }
                    style={getStyle(item?.selectedAnswer, answer, item,i)}
                >
                  {answer}
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="w-full flex items-center justify-around border-t-[1px] py-3 px-2">
        <button
          className={
            id > 1
              ? "py-2 px-3 bg-lime-500 rounded-[7px] text-white"
              : "py-2 px-3 bg-lime-300 rounded-[7px] "
          }
          onClick={id > 1 ? () => PrevId() : null}
          text-gray-400
        >
          PREVIOUS
        </button>
        <button
          className={
            selectedAnswer
              ? "py-2 px-3 bg-gray-400 rounded-[7px] text-white"
              : "py-2 px-3 bg-gray-300 rounded-[7px] text-white"
          }
          onClick={
            selectedAnswer
              ? () =>
                  submitAnswer(item)
              : null
          }
        >
          SUBMIT
        </button>
        <button
          className={
            id < number
              ? "py-2 px-3 bg-blue-600 rounded-[7px] text-white"
              : "py-2 px-3 bg-blue-400 rounded-[7px] text-gray-200"
          }
          onClick={id < number ? () => setId((prev) => prev + 1) : null}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Question;
