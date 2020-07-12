import React, { useState, useEffect } from "react";
import { AnimalImage } from "./AnimalImage";

export function Bunny({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [bunnyImg, setBunnyImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchBunnyImage = async () => {
      const response = await fetch(
        "https://api.bunnies.io/v2/loop/random/?media=gif,png"
      );
      const data = await response.json();
      setBunnyImg(data.media.poster);
      setTimeFetched(new Date(Date.now()));
    };

    if (isFetching) {
      fetchBunnyImage();
      intervalId = setInterval(fetchBunnyImage, refreshTime);

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
      <AnimalImage image={bunnyImg} type="bunny" timeFetched={timeFetched} />
    )
  );
}
