import React from "react";
import { useParams, MemoryRouter } from "react-router-dom";
import { render, cleanup } from "@testing-library/react";
import { randomInteger } from "../../helpers/numberHelper";
import { DisplayAnimalContainer } from "../DisplayAnimalContainer";

const mockAnimals = ["dog", "cat", "bird"];
const randomIndex = randomInteger(0, mockAnimals.length);
const mockAnimal = mockAnimals[randomIndex];

// need to make sure to call the function from the object in the code
let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
}));

//  Cannot set property useParams of #<Object> which has only a getter
// default import + this spy syntax doesn't work b/c default export of react-router-dom only has getters
// jest
//   .spyOn(reactRouterDom, "useParams")
//   .mockImplementation(jest.fn(() => mockAnimal));

let mockPluralize = jest.fn((word) => word);
jest.mock("pluralize", () => ({
  __esModule: true,
  default: (word) => mockPluralize(word),
}));

let subject;

afterEach(cleanup);

describe("DisplayAnimalContainer", () => {
  describe("with a supported animal type", () => {
    beforeEach(() => {
      useParams.mockReturnValue({
        animal: mockAnimal,
      });
      subject = (
        <MemoryRouter>
          <DisplayAnimalContainer />
        </MemoryRouter>
      );
    });

    it("renders the correct animal component(s)", () => {
      const { getAllByText } = render(subject);
      expect(getAllByText(new RegExp(mockAnimal, "i")).length).toBeGreaterThan(
        0
      );
    });
  });

  describe("without a supported animal type", () => {
    beforeEach(() => {
      useParams.mockReturnValue({
        animal: "hedgehog",
      });
      subject = (
        <MemoryRouter>
          <DisplayAnimalContainer />
        </MemoryRouter>
      );
    });

    it("does not render an animal component", () => {
      const { getByText } = render(subject);
      expect(getByText(/oh no/i)).toBeTruthy();
    });
  });
});
