import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { mockAnimals } from "../../testHelpers/animalsFactory";
import { Home } from "../Home";

let subject;

let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

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
