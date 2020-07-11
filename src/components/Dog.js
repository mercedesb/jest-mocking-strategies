import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalImage } from "./AnimalImage";

export function Dog({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [dogImg, setDogImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  const fetchDogImage = async () => {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    setDogImg(response.data.message);
    setTimeFetched(new Date());
  };

  useEffect(() => {
    if (isFetching) {
      fetchDogImage();

      setIntervalVar(
        setInterval(async () => {
          fetchDogImage();
        }, refreshTime)
      );
    } else if (!!intervalVar) {
      clearInterval(intervalVar);
    }
  }, [isFetching]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    isFetching && (
      <AnimalImage image={dogImg} type="dog" timeFetched={timeFetched} />
    )
  );
}
