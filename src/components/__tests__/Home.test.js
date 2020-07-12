import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import { Home } from "../Home";

let subject;

const mockAnimals = ["dog", "cat", "bird"];

// need to make sure to call the function from the object in the code
let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

let mockPluralize = jest.fn((word) => word);
jest.mock("pluralize", () => ({
  __esModule: true,
  default: (word) => mockPluralize(word),
}));

afterEach(cleanup);

describe("Home", () => {
  describe("render", () => {
    beforeEach(() => {
      subject = (
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    it("renders a button for each animal", () => {
      const { getByText } = render(subject);
      mockAnimals.forEach((animal) => {
        expect(
          getByText(new RegExp(`see cute ${animal}`, "i"))
        ).toBeInTheDocument();
      });
    });
  });
});
