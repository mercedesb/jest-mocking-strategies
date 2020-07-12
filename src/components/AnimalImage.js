import React from "react";
import { displayTime } from "../helpers/dateTimeHelper";

export function AnimalImage({ type, image, timeFetched }) {
  return (
    <div className="flex flexColumn alignCenter">
      <div className="imgContainer flex justifyCenter">
        <img src={image} alt={`A random ${type}. I'm sure it's very cute.`} />
      </div>
      <p>This image was fetched at {displayTime(timeFetched)}</p>
    </div>
  );
}
