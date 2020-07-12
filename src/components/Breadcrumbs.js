import React from "react";
import { Link, useParams } from "react-router-dom";
import pluralize from "pluralize";
import voca from "voca";

export function Breadcrumbs() {
  let { animal } = useParams();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>

          <span className="breadcrumbSpacer">{">"}</span>
        </li>
        <li>{voca.capitalize(pluralize(animal))}</li>
      </ul>
    </nav>
  );
}
