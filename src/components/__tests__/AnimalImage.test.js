import React from "react";
import { render } from "@testing-library/react";
import { AnimalImage } from "../AnimalImage";

let subject;

describe("AnimalImage", () => {
  beforeEach(() => {
    subject = (
      <AnimalImage
        type="dog"
        image="http://image.com"
        timeFetched={new Date(Date.now())}
      />
    );
  });

  describe("render", () => {
    it("renders an image", () => {
      const { getByAltText } = render(subject);
      expect(getByAltText(/a random dog/i)).toBeInTheDocument();
    });

    it("renders text telling the user when the image was updated", () => {
      const { getByText } = render(subject);
      expect(
        getByText(/this image was fetched at \d{2}:\d{2}:\d{2}/i)
      ).toBeInTheDocument();
    });
  });
});
