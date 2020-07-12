import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalImage } from "./AnimalImage";

export function Cat({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [catImg, setCatImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchCatImage = async () => {
      const response = await axios.get("https://aws.random.cat/meow");
      setCatImg(response.data.file);
      setTimeFetched(new Date(Date.now()));
    };

    if (isFetching) {
      fetchCatImage();
      intervalId = setInterval(fetchCatImage, refreshTime);
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
      <AnimalImage image={catImg} type="cat" timeFetched={timeFetched} />
    )
  );
}
