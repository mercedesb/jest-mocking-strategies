import React from "react";
import { useParams } from "react-router-dom";
import pluralize from "pluralize";
import { Breadcrumbs } from "./Breadcrumbs";
import { Cat } from "./Cat";
import { Dog } from "./Dog";
import { FetchingContainer } from "./FetchingContainer";
import { Fox } from "./Fox";
import { Goat } from "./Goat";
import { SeeOthers } from "./SeeOthers";

export function DisplayAnimalContainer() {
  let { animal } = useParams();

  return (
    <React.Fragment>
      <Breadcrumbs />
      <FetchingContainer
        animal={pluralize(animal, 1).toLowerCase()}
        render={(isFetching, refreshTime) => {
          const passThroughProps = { isFetching, refreshTime };

          if (/dog/i.test(animal)) {
            return <Dog {...passThroughProps} />;
          } else if (/cat/i.test(animal)) {
            return <Cat {...passThroughProps} />;
          } else if (/fox/i.test(animal)) {
            return <Fox {...passThroughProps} />;
          } else if (/goat/i.test(animal)) {
            return <Goat {...passThroughProps} />;
          } else {
            return null;
          }
        }}
      />
      <SeeOthers />
    </React.Fragment>
  );
}
