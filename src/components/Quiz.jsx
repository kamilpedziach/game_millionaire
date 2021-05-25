import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

const Quiz = ({ questionNumber, setStop, data, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [multipleClickBlock, setMultipleClickBlock] = useState(false);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    if (!multipleClickBlock) {
      setSelectedQuestion(a);
      setClassName("answer active");
      delay(2000, () =>
        setClassName(a.correct ? "answer correct" : "answer wrong")
      );
      delay(5000, () => {
        if (a.correct) {
          correctAnswer();
          delay(1000, () => {
            if (questionNumber === 15) {
              setStop(true);
            } else {
              setQuestionNumber((prev) => prev + 1);
              setSelectedQuestion(null);
              setMultipleClickBlock(false);
            }
          });
        } else {
          wrongAnswer();
          delay(1000, () => {
            setQuestionNumber((prev) => prev - 1);
            setStop(true);
          });
        }
      });
    }
    setMultipleClickBlock(true);
  };

  const answerList = question?.answers.map((a) => (
    <div
      className={selectedQuestion === a ? className : "answer"}
      onClick={() => handleClick(a)}
    >
      {a.text}
    </div>
  ));
  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">{answerList}</div>
    </div>
  );
};

export default Quiz;
