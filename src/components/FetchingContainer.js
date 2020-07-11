import React, { useState, useEffect, useContext } from "react";
import pluralize from "pluralize";
import { SupportedAnimals } from "../contexts/SupportedAnimals";

const REFRESH_TIME_IN_SECONDS = 3;

export function FetchingContainer({ animal, render }) {
  const { animals } = useContext(SupportedAnimals);

  const [isFetching, setIsFetching] = useState(
    sessionStorage.getItem("isFetching") === "true"
  );

  useEffect(() => {
    sessionStorage.setItem("isFetching", isFetching);
  }, [isFetching]);

  const isSupported = animals.includes(animal);

  return (
    <React.Fragment>
      {isSupported ? (
        <div>
          <div className="buttonContainer textCenter">
            <button onClick={() => setIsFetching(!isFetching)}>
              {isFetching
                ? "Stop, I can't take it! Too much cute!"
                : `Please fetch me some cute ${pluralize(animal)}`}
            </button>
          </div>
          {render(isFetching, REFRESH_TIME_IN_SECONDS * 1000)}
        </div>
      ) : (
        <div>
          <p>
            Oh no, I wish we could display cute {pluralize(animal)} too, but
            there isn't an API for that 😭
          </p>
          <p>Maybe you should make one!</p>
        </div>
      )}
    </React.Fragment>
  );
}
