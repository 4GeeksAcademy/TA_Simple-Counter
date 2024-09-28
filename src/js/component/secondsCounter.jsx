import React, { useState, useEffect, useRef } from "react";

const SecondsCounter = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when paused
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const resetInterval = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  return (
    <div className="container d-flex justify-content-between">
      <div
        className="stopwatch d-flex"
        style={{
          border: "solid 1px teal",
          borderRadius: "10px",
          padding: "5rem",
          backgroundColor: "teal",
          color: "white",
          fontSize: "26px",
          fontFamily: "comic",
        }}
      >
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div
        className="buttonGroup d-flex"
        style={{
          border: "solid 1px teal",
          borderRadius: "10px",
          padding: "5rem",
          backgroundColor: "teal",
          color: "white",
          fontSize: "26px",
        }}
      >
        <div
          class="btn-group"
          role="group"
          aria-label="Basic outlined example"
          style={{ width: "15rem" }}
        >
          <button
            type="button"
            class="btn btn-outline-light py-1"
            onClick={toggleTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            type="button"
            class="btn btn-outline-light py-1"
            onClick={resetInterval}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecondsCounter;
