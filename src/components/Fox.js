import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalImage } from "./AnimalImage";

export function Fox({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [foxImg, setFoxImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  const fetchFoxImage = async () => {
    const response = await axios.get("https://randomfox.ca/floof/");
    setFoxImg(response.data.image);
    setTimeFetched(new Date());
  };

  useEffect(() => {
    if (isFetching) {
      fetchFoxImage();

      setIntervalVar(
        setInterval(async () => {
          fetchFoxImage();
        }, refreshTime)
      );
    } else if (!!intervalVar) {
      clearInterval(intervalVar);
    }
  }, [isFetching]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    isFetching && (
      <AnimalImage image={foxImg} type="fox" timeFetched={timeFetched} />
    )
  );
}
