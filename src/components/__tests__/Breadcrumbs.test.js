import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import pluralize from "pluralize";
import { randomInteger } from "../../helpers/numberHelper";
import { Breadcrumbs } from "../Breadcrumbs";

const mockAnimals = ["dog", "cat", "bird"];
const randomIndex = randomInteger(0, mockAnimals.length);
const mockAnimal = mockAnimals[randomIndex];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    animal: mockAnimal,
  }),
}));

// to mock a default export without an object
// mock the module
// add a mockImplementation or mockReturn value in your test
jest.mock("pluralize", () => jest.fn());

// error: The module factory of `jest.mock()` is not allowed to reference any out of scope variables
// prefix mock to your variable name
// mocking a default export function

// to use spyOn, you must have an object.
// modules that default export the function can't be spied on b/c you don't have an object spy on
// Note: you can’t spy something that doesn’t exist on the object.

let subject;

describe("Breadcrumbs", () => {
  beforeEach(() => {
    pluralize.mockReturnValue(mockAnimal);
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
