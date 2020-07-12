import React from "react";
import { useParams, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { mockAnimals, mockAnimal } from "../../testHelpers/animalsFactory";
import { DisplayAnimalContainer } from "../DisplayAnimalContainer";

let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

let mockPluralize = jest.fn((word) => word);
jest.mock("pluralize", () => ({
  __esModule: true,
  default: (word) => mockPluralize(word),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
}));

let subject;

describe("DisplayAnimalContainer", () => {
  beforeEach(() => {
    subject = (
      <MemoryRouter>
        <DisplayAnimalContainer />
      </MemoryRouter>
    );
  });

  describe("with a supported animal type", () => {
    beforeEach(() => {
      useParams.mockReturnValue({
        animal: mockAnimal,
      });
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
    });

    it("does not render an animal component", () => {
      const { getByText } = render(subject);
      expect(getByText(/oh no/i)).toBeTruthy();
    });
  });
});
