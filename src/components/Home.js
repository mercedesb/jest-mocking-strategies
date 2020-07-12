import React from "react";
import { Link } from "react-router-dom";
import pluralize from "pluralize";
import { SupportedAnimals } from "../contexts/SupportedAnimals";

export function Home() {
  const { animals } = React.useContext(SupportedAnimals);

  return (
    <div>
      <p>
        Did you know that looking at cute images can increase your focus and
        productivity? It's been shown that{" "}
        <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0046362">
          people perform tasks requiring focused attention more carefully after
          viewing cute images.
        </a>
      </p>
      <div className="buttonContainer flex justifyCenter">
        {animals.map((animal) => (
          <button key={animal}>
            <Link to={`/cute/${animal}`}>See cute {pluralize(animal)}</Link>
          </button>
        ))}
      </div>
    </div>
  );
}
