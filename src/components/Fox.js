import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalImage } from "./AnimalImage";

export function Fox({ isFetching, refreshTime }) {
  const [intervalVar, setIntervalVar] = useState(null);
  const [foxImg, setFoxImg] = useState("");
  const [timeFetched, setTimeFetched] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchFoxImage = async () => {
      const response = await axios.get("https://randomfox.ca/floof/");
      setFoxImg(response.data.image);
      setTimeFetched(new Date(Date.now()));
    };

    if (isFetching) {
      fetchFoxImage();
      intervalId = setInterval(fetchFoxImage, refreshTime);

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
      <AnimalImage image={foxImg} type="fox" timeFetched={timeFetched} />
    )
  );
}
