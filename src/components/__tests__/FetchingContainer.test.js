import React from "react";
import { render, act, cleanup, fireEvent } from "@testing-library/react";
import { randomInteger } from "../../helpers/numberHelper";
import { FetchingContainer } from "../FetchingContainer";

let subject;
let animal;
let renderFn = jest.fn();

const mockAnimals = ["dog", "cat", "bird"];
const randomIndex = randomInteger(0, mockAnimals.length);

// need to make sure to call the function from the object in the code
let mockUseContext = jest.fn(() => ({ animals: mockAnimals }));
jest.spyOn(React, "useContext").mockImplementation(mockUseContext);

let mockPluralize = jest.fn((word) => word);
jest.mock("pluralize", () => ({
  __esModule: true,
  default: (word) => mockPluralize(word),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

describe("FetchingContainer", () => {
  describe("with a supported animal", () => {
    beforeEach(() => {
      animal = mockAnimals[randomIndex];
      subject = <FetchingContainer animal={animal} render={renderFn} />;
    });

    describe("render", () => {
      it("renders a button to fetch animals", () => {
        const { getByText } = render(subject);
        expect(
          getByText(new RegExp(`please fetch me some cute ${animal}`, "i"))
        ).toBeInTheDocument();
      });

      it("calls the render function", () => {
        render(subject);
        expect(renderFn).toHaveBeenCalledWith(false, expect.any(Number));
      });

      describe("clicking the button", () => {
        beforeEach(() => {
          sessionStorage.removeItem("isFetching");
        });

        it("updates the button text", () => {
          const { getByText } = render(subject);
          const button = getByText(
            new RegExp(`please fetch me some cute ${animal}`, "i")
          );
          act(() => {
            fireEvent.click(button);
          });
          expect(
            getByText("Stop, I can't take it! Too much cute!")
          ).toBeInTheDocument();
        });

        it("sets sessionStorage isFetching to true", () => {
          const { getByText } = render(subject);
          const button = getByText(
            new RegExp(`please fetch me some cute ${animal}`, "i")
          );
          act(() => {
            fireEvent.click(button);
          });
          expect(sessionStorage.getItem("isFetching")).toEqual("true");
        });

        it("passes isFetching to the render function", () => {
          const { getByText } = render(subject);
          const button = getByText(
            new RegExp(`please fetch me some cute ${animal}`, "i")
          );
          act(() => {
            fireEvent.click(button);
          });
          expect(renderFn).toHaveBeenCalledWith(true, expect.any(Number));
        });
      });
    });
  });

  describe("with a non-supported animal", () => {
    beforeEach(() => {
      animal = "hedgehog";
      subject = <FetchingContainer animal={animal} render={renderFn} />;
    });

    describe("render", () => {
      it("renders a message that the animal is not supported", () => {
        const { getByText } = render(subject);
        expect(
          getByText(
            new RegExp(`oh no, I wish we could display cute ${animal}`, "i")
          )
        ).toBeInTheDocument();
      });

      it("does not call the render function", () => {
        render(subject);
        expect(renderFn).not.toHaveBeenCalled();
      });
    });
  });
});
