import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalImage } from "./AnimalImage";

export function Cat({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [catImg, setCatImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  const fetchCatImage = async () => {
    const response = await axios.get("https://aws.random.cat/meow");
    setCatImg(response.data.file);
    setTimeFetched(new Date());
  };

  useEffect(() => {
    if (isFetching) {
      fetchCatImage();

      setIntervalVar(
        setInterval(async () => {
          fetchCatImage();
        }, refreshTime)
      );
    } else if (!!intervalVar) {
      clearInterval(intervalVar);
    }
  }, [isFetching]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    isFetching && (
      <AnimalImage image={catImg} type="cat" timeFetched={timeFetched} />
    )
  );
}
