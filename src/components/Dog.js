import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalImage } from "./AnimalImage";

export function Dog({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [dogImg, setDogImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchDogImage = async () => {
      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );
      setDogImg(response.data.message);
      setTimeFetched(new Date(Date.now()));
    };

    if (isFetching) {
      fetchDogImage();
      intervalId = setInterval(fetchDogImage, refreshTime);

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
      <AnimalImage image={dogImg} type="dog" timeFetched={timeFetched} />
    )
  );
}
