import React from "react";
import { Link, useParams } from "react-router-dom";
import pluralize from "pluralize";

export function Breadcrumbs() {
  let { animal } = useParams();

  return (
    <nav className="capitalize">
      <ul>
        <li>
          <Link to="/">Home</Link>

          <span className="breadcrumbSpacer">{">"}</span>
        </li>
        <li>{pluralize(animal)}</li>
      </ul>
    </nav>
  );
}
