import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioBeep = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      audioBeep.current.play();
      if (isSession) {
        setIsSession(false);
        setTimeLeft(breakLength * 60);
      } else {
        setIsSession(true);
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [isRunning, timeLeft, breakLength, sessionLength, isSession]);

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsSession(true);
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="pomodoro-clock">
      <div id="break-label">Break Length</div>
      <div>
        <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={handleBreakIncrement}>+</button>
      </div>
      <div id="session-label">Session Length</div>
      <div>
        <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" onClick={handleSessionIncrement}>+</button>
      </div>
      <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <button id="start_stop" onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button id="reset" onClick={handleReset}>Reset</button>
      <audio id="beep" ref={audioBeep} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  );
}

export default App;