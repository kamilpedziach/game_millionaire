import React, { useEffect, useMemo, useState } from "react";
import "./app.css";
import Quiz from "./components/Quiz.jsx";
import Timer from "./components/Timer.jsx";
import Start from "./components/Start.jsx";
const App = () => {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earnedMoney, setEarnedMoney] = useState("0 zł");

  const resize = () => {
    console.log(window.innerHeight, window.innerWidth);
  };

  window.onresize = resize;

  const data = [
    {
      id: 1,
      question: "Co ukoi nerwy i zastąpi cytrynę?",
      answers: [
        {
          text: "mięta pieprzowa",
          correct: false,
        },
        {
          text: "melisa lekarska",
          correct: true,
        },
        {
          text: "jaskółcze ziele",
          correct: false,
        },
        {
          text: "ziele angielskie",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: `W piosence Dwa plus Jeden pada propozycja: "Chodź pomaluj mój świat..."`,
      answers: [
        {
          text: "na żółto i na niebiesko",
          correct: true,
        },
        {
          text: "niech wygląda jak kwiat",
          correct: false,
        },
        {
          text: "mam już dość szarych krat",
          correct: false,
        },
        {
          text: "bo świat jest dziś pod kreską",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: `Jaka jest stolica Izraela?"`,
      answers: [
        {
          text: "Palestyna",
          correct: false,
        },
        {
          text: "Jerozolima",
          correct: true,
        },
        {
          text: "Omen",
          correct: false,
        },
        {
          text: "Maskat",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question: `Które z wymienionych miast jest największe?"`,
      answers: [
        {
          text: "Częstochowa",
          correct: true,
        },
        {
          text: "Paryż",
          correct: false,
        },
        {
          text: "Opole",
          correct: false,
        },
        {
          text: "Nicea",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: `Wyrażenie składające się z zaprzeczających sobie składników to`,
      answers: [
        {
          text: "onomatopeja",
          correct: false,
        },
        {
          text: "oksymoron",
          correct: true,
        },
        {
          text: "przenośnia",
          correct: false,
        },
        {
          text: "aforyzm",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "Co jest tradycyjnym środkiem transportu amiszów?",
      answers: [
        {
          text: "motorówka",
          correct: false,
        },
        {
          text: "motocykl",
          correct: false,
        },
        {
          text: "śnieżny skuter",
          correct: false,
        },
        {
          text: "zaprzęg",
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: "Pęd wyrosły z nieuszlachetnionej podkładki to:",
      answers: [
        {
          text: "kot albo pies",
          correct: false,
        },
        {
          text: "baran albo kozioł",
          correct: false,
        },
        {
          text: "koń albo krowa",
          correct: false,
        },
        {
          text: "wilk albo dzik",
          correct: true,
        },
      ],
    },
    {
      id: 8,
      question:
        "Tytułowa wataha z serialu wyreżyserowanego m.in. przez Kasię Adamik to:",
      answers: [
        {
          text: "wilcza rodzina",
          correct: false,
        },
        {
          text: "rosyjscy szpiedzy",
          correct: false,
        },
        {
          text: "strażnicy graniczni",
          correct: true,
        },
        {
          text: "uchodźcy ze Wschodu",
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: "Których bierek w bierkach jest najwięcej?",
      answers: [
        {
          text: "oszczepów",
          correct: true,
        },
        {
          text: "wioseł",
          correct: false,
        },
        {
          text: "bosaków",
          correct: false,
        },
        {
          text: "trójzębów",
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question:
        "W jakiej bitwie miał swój udział sławny w Polsce i Szkocji kapral niedźwiedź o imieniu Wojtek?",
      answers: [
        {
          text: "pod Monte Cassino",
          correct: true,
        },
        {
          text: "pod Grunwaldem",
          correct: false,
        },
        {
          text: "pod Wiedniem",
          correct: false,
        },
        {
          text: "o Anglię",
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: "Aorta wychodzi z lewej komory serca, a kończy się:",
      answers: [
        {
          text: "w prawej komorze",
          correct: false,
        },
        {
          text: "w jamie brzusznej",
          correct: true,
        },
        {
          text: "w płucach",
          correct: false,
        },
        {
          text: "w mózgu",
          correct: false,
        },
      ],
    },
    {
      id: 12,
      question:
        "Kto i na jakim instrumencie gra na dachu jednego z domów Anatewki w słynnym musicalu?",
      answers: [
        {
          text: "rabin na fujarce",
          correct: false,
        },
        {
          text: "mleczarz na skrzypcach",
          correct: false,
        },
        {
          text: "wiejski skrzypek na skrzypcach",
          correct: true,
        },
        {
          text: "córki Tewjego - każda na innym",
          correct: false,
        },
      ],
    },
    {
      id: 13,
      question: "Symbol waluty euro to stylizowana litera grecka. Która?",
      answers: [
        {
          text: "beta",
          correct: false,
        },
        {
          text: "eta",
          correct: false,
        },
        {
          text: "heta",
          correct: false,
        },
        {
          text: "epsilon",
          correct: true,
        },
      ],
    },
    {
      id: 14,
      question:
        "Za 30 judaszowych srebrników arcykapłani kupili kawałek ziemi nazywany Polem Garncarza, który przeznaczyli na:",
      answers: [
        {
          text: "plantację oliwek",
          correct: false,
        },
        {
          text: "wybieg dla lwów",
          correct: false,
        },
        {
          text: "cmentarz dla cudzoziemców",
          correct: true,
        },
        {
          text: "targowisko",
          correct: false,
        },
      ],
    },
    {
      id: 15,
      question:
        "Ile to jest 1111 razy 1111, jeśli 1 razy 1 to 1, a 11 razy 11 to 121",
      answers: [
        {
          text: "12 321",
          correct: false,
        },
        {
          text: "1 234 321",
          correct: true,
        },
        {
          text: "111 111 111",
          correct: false,
        },
        {
          text: "123 454 321",
          correct: false,
        },
      ],
    },
  ];
  const moneyQuestions = useMemo(
    () =>
      [
        { id: 1, amount: "100 zł" },
        { id: 2, amount: "200 zł" },
        { id: 3, amount: "300 zł" },
        { id: 4, amount: "500 zł" },
        { id: 5, amount: "1.000 zł" },
        { id: 6, amount: "2.000 zł" },
        { id: 7, amount: "4.000 zł" },
        { id: 8, amount: "8.000 zł" },
        { id: 9, amount: "16.000 zł" },
        { id: 10, amount: "32.000 zł" },
        { id: 11, amount: "64.000 zł" },
        { id: 12, amount: "125.000 zł" },
        { id: 13, amount: "250.000 zł" },
        { id: 14, amount: "500.000 zł" },
        { id: 15, amount: "1.000.000 zł" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarnedMoney(
        moneyQuestions.find((m) => m.id === questionNumber - 1).amount
      );
  }, [moneyQuestions, questionNumber]);

  const moneyList = moneyQuestions.map((question) => (
    <li className={questionNumber === question.id ? "active" : ""}>
      <span className="question">{question.id}</span>
      <span className="amount">{question.amount}</span>
    </li>
  ));
  console.log(questionNumber);
  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="loseGame">
                Wygrałeś:{" "}
                {questionNumber === 15 ? "MILION ZŁOTYCH !!!!" : earnedMoney}
              </h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="money">
            <h3>{username}</h3>
            <ul>{moneyList}</ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
