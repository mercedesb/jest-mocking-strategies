import React from "react";
import { useParams, MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { mockAnimals, mockAnimal } from "../../testHelpers/animalsFactory";
import { DisplayAnimalContainer } from "../DisplayAnimalContainer";

let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useParams: jest.fn(),
}));

let mockPluralize = jest.fn((word) => word);
jest.mock("pluralize", () => ({
  __esModule: true,
  default: (word) => mockPluralize(word),
}));

let subject;

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
