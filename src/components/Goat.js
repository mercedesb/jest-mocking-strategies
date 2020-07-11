import React, { useState, useEffect } from "react";
import { AnimalImage } from "./AnimalImage";

export function Goat({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [timeFetched, setTimeFetched] = useState("");

  const reRender = async () => {
    setTimeFetched(new Date());
  };

  useEffect(() => {
    if (isFetching) {
      reRender();

      setIntervalVar(
        setInterval(async () => {
          reRender();
        }, refreshTime)
      );
    } else if (!!intervalVar) {
      clearInterval(intervalVar);
    }
  }, [isFetching]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    isFetching && (
      <AnimalImage
        image={`https://placegoat.com/400?q=${timeFetched.toString()}`}
        type="goat"
        timeFetched={timeFetched}
      />
    )
  );
}
