import { useState } from "react";
import React from "react";
import { quiz } from "./assets/data/gkquestions";
import "./index.css";
const App = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswer: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion]; // discussed
  const onclickNext = () => {
    setActiveQuestion((prev) => prev + 1); // Mr Sana Ullah guided me on it.
    setSelectedAnswerIndex(null),
      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev, // sana ullah guided me
              score: prev.score + 5,
              correctAnswer: prev.correctAnswer + 1,
            }
          : {
              ...prev,
              wrongAnswers: prev.wrongAnswers + 1,
            }
      );
  };
  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log("right" + index);
    } else {
      setSelectedAnswer(false);
      console.log("wrong" + index);
    }
  };
  return (
    <div className="conainter-fluid bg-success-subtle bg-success-subtle">
      <div className="row align-items-center m-4 p-4">
        <div className="col-12">
          <h1>Quiz App</h1>
          {/* <h2>{questions[activeQuestion].question}</h2> */}
          <h2>{question}</h2>
          <ul>
            <h3>
              {choices.map((ans, index) => (
                <li
                  onClick={() => onAnswerSelected(ans, index)}
                  key={ans}
                  className={
                    selectedAnswer && selectedAnswerIndex === index
                      ? "rigt-answer"
                      : selectedAnswerIndex === index
                      ? "wrong-answer"
                      : null
                  }
                >
                  {ans}
                </li>
              ))}
            </h3>
          </ul>
          <button
            className="btn btn-light"
            onClick={onclickNext}
            disabled={selectedAnswerIndex === null}
          >
            {activeQuestion === questions.length - 1 ? "Finish Please" : "Next"}
          </button>
          <hr />
          <hr />
          <hr />
          <hr />
          <h3>Correct Answers= {result.correctAnswer}</h3>
          <h3>Wrong Answers= {result.wrongAnswers}</h3>
          <h3>Total Score: {result.score}</h3>
        </div>
      </div>
    </div>
  );
};

export default App;

// 1.   collection of questions.
// 2.   choice of correct answers.
// 3.   correct or wrong answer.
// 4.   5+ / 5 -
// 5.

// Quize Components..................
// 1. Questions.// quize file.........JSON format....
// 2. Answers.
// next button
// 1st state (question who are available),2nd state (select question)
// 3rd state (for move on)
