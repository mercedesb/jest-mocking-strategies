import React from "react";
import { DisplayDateTime } from "./DisplayDateTime";

export function AnimalImage({ type, image, timeFetched }) {
  return (
    <div className="flex flexColumn alignCenter">
      <div className="imgContainer flex justifyCenter">
        <img src={image} alt={`A random ${type}. I'm sure it's very cute.`} />
      </div>
      <p>
        This image was fetched at <DisplayDateTime datetime={timeFetched} />
      </p>
    </div>
  );
}
