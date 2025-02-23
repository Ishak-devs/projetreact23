import { useState, useEffect } from "react";

const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 0) {
            setIsSession(!isSession);
            return isSession ? breakLength * 60 : sessionLength * 60;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, isSession, breakLength, sessionLength]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-clock">
      <div id="break-label">Durée de pause</div>
      <button id="break-decrement" onClick={() => setBreakLength(Math.max(1, breakLength - 1))}>-</button>
      <span id="break-length">{breakLength}</span>
      <button id="break-increment" onClick={() => setBreakLength(Math.min(60, breakLength + 1))}>+</button>

      <div id="session-label">Durée de session</div>
      <button id="session-decrement" onClick={() => setSessionLength(Math.max(1, sessionLength - 1))}>-</button>
      <span id="session-length">{sessionLength}</span>
      <button id="session-increment" onClick={() => setSessionLength(Math.min(60, sessionLength + 1))}>+</button>

      <div id="timer-label">{isSession ? "Session" : "Pause"}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>

      <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Démarrer"}
      </button>
      <button
        id="reset"
        onClick={() => {
          setIsRunning(false);
          setBreakLength(5);
          setSessionLength(25);
          setTimeLeft(25 * 60);
          setIsSession(true);
        }}
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default PomodoroClock;
