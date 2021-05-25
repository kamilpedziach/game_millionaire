import { useEffect, useState } from "react";
import useSound from "use-sound";
import wrong from "../assets/wrong.mp3";

const Timer = ({ setStop, questionNumber }) => {
  const [wrongAnswer] = useSound(wrong);
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    if (timer === 0) {
      wrongAnswer();
      return setStop(true);
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, timer, wrongAnswer]);
  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);
  return timer;
};

export default Timer;
