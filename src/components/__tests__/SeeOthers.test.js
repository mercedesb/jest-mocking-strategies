import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { randomInteger } from "../../helpers/numberHelper";
import { SeeOthers } from "../SeeOthers";

let subject;

const mockAnimals = ["dog", "cat", "bird"];
const randomIndex = randomInteger(0, mockAnimals.length);
const mockAnimal = mockAnimals[randomIndex];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: () => ({
    animal: mockAnimal,
  }),
}));

// need to make sure to call the function from the object in the code
let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

let mockPluralize = jest.fn((word) => word);
jest.mock("pluralize", () => ({
  __esModule: true,
  default: (word) => mockPluralize(word),
}));

describe("SeeOthers", () => {
  describe("render", () => {
    beforeEach(() => {
      subject = (
        <MemoryRouter>
          <SeeOthers />
        </MemoryRouter>
      );
    });

    it("renders a button for each animal except the current one", () => {
      const { queryByText, getByText } = render(subject);
      expect(
        queryByText(new RegExp(`${mockAnimal}`, "i"))
      ).not.toBeInTheDocument();

      mockAnimals
        .filter((a) => a !== mockAnimal)
        .forEach((animal) => {
          expect(getByText(new RegExp(`${animal}`, "i"))).toBeInTheDocument();
        });
    });
  });
});
