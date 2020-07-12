import React, { useState, useEffect } from "react";

export function LittleTest({ func, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [timeFetched, setTimeFetched] = useState("");

  useEffect(() => {
    const refresh = () => {
      func();
      setTimeFetched(new Date(Date.now()));
    };

    refresh();
    let intervalId = setInterval(refresh, refreshTime);
    setIntervalVar(intervalId);

    return function cleanup() {
      if (intervalVar) {
        clearInterval(intervalVar);
      }
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return <div>{timeFetched.toString()}</div>;
}
