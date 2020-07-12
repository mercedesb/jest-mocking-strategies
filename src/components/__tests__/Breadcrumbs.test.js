import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import pluralize from "pluralize";
import { mockAnimal } from "../../testHelpers/animalsFactory";
import { Breadcrumbs } from "../Breadcrumbs";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    animal: mockAnimal,
  }),
}));

let subject;

describe("Breadcrumbs", () => {
  beforeEach(() => {
    subject = (
      <MemoryRouter>
        <Breadcrumbs />
      </MemoryRouter>
    );
  });

  describe("render", () => {
    it("renders a link to home", () => {
      const { getByText } = render(subject);
      expect(getByText(/home/i)).toBeInTheDocument();
    });

    it("renders a list item with the current page", () => {
      const { getByText } = render(subject);
      expect(getByText(new RegExp(mockAnimal, "i"))).toBeInTheDocument();
    });

    it("pluralizes the current page name", () => {
      render(subject);
      expect(pluralize).toHaveBeenCalled();
    });

    it("capitalizes the current page name", () => {
      const { getByText } = render(subject);
      expect(getByText(/capitalize mocked!/i)).toBeInTheDocument();
    });
  });
});
