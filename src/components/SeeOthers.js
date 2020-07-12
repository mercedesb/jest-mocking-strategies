import React from "react";
import { useParams, Link } from "react-router-dom";
import pluralize from "pluralize";
import { SupportedAnimals } from "../contexts/SupportedAnimals";

export function SeeOthers() {
  const { animal } = useParams();
  const { animals } = React.useContext(SupportedAnimals);

  const animalsToRender = animals.filter((a) => a !== pluralize(animal, 1));

  return (
    <div>
      <p>Want to see other cute animals?</p>
      <div className="capitalize">
        <ul>
          {animalsToRender.map((a) => (
            <li key={a}>
              <Link to={a}>{pluralize(a)}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
