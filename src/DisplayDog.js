import React, { useState, useEffect } from "react";
import axios from "axios";
import { DisplayDateTime } from "./DisplayDateTime";

const REFRESH_TIME_IN_SECONDS = 5;

export function DisplayDog(props) {
  const [isFetching, setIsFetching] = useState(false);
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
        }, REFRESH_TIME_IN_SECONDS * 1000)
      );
    } else if (!!intervalVar) {
      clearInterval(intervalVar);
    }
  }, [isFetching]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <div className="buttonContainer">
        <button onClick={() => setIsFetching(!isFetching)}>
          {isFetching
            ? "Stop, I can't take it! Too much cute!"
            : "Please fetch me some cute dogs"}
        </button>
      </div>

      {isFetching && (
        <div>
          <div className="imgContainer">
            <img src={dogImg} alt="A random dog. I'm sure it's very cute." />
          </div>
          <p>
            This dog image was fetched at{" "}
            <DisplayDateTime datetime={timeFetched} />
          </p>
        </div>
      )}
    </React.Fragment>
  );
}
