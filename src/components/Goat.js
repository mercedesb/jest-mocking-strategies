import React, { useState, useEffect } from "react";
import { AnimalImage } from "./AnimalImage";

export function Goat({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [timeFetched, setTimeFetched] = useState("");

  useEffect(() => {
    let intervalId;

    const reRender = async () => {
      setTimeFetched(new Date(Date.now()));
    };

    if (isFetching) {
      reRender();
      intervalId = setInterval(reRender, refreshTime);

      setIntervalVar(intervalId);
    } else if (!!intervalVar) {
      clearInterval(intervalVar);
    }

    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [isFetching]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    isFetching && (
      <AnimalImage
        image={`https://placegoat.com/400?q=${timeFetched.valueOf()}`}
        type="goat"
        timeFetched={timeFetched}
      />
    )
  );
}
