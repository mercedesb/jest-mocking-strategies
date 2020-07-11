import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import pluralize from "pluralize";
import { SupportedAnimals } from "../contexts/SupportedAnimals";

export function SeeOthers() {
  const { animal } = useParams();
  const { animals: supportedAnimals } = useContext(SupportedAnimals);

  const animalsToRender = supportedAnimals.filter(
    (a) => a !== pluralize(animal, 1)
  );

  return (
    <div>
      <p>Want to see other cute animals?</p>
      <div className="capitalize">
        <ul>
          {animalsToRender.map((a) => (
            <li>
              <Link to={a}>{pluralize(a)}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
