import React from "react";
import { render, act, cleanup, waitFor } from "@testing-library/react";
import { Goat } from "../Goat";

afterEach(cleanup);

let subject;
let refreshTime = 5000;

describe("Goat", () => {
  describe("when fetching", () => {
    beforeEach(() => {
      jest.resetAllMocks();

      subject = <Goat isFetching={true} refreshTime={refreshTime} />;
    });

    it("fetches an image on initial render", async () => {
      jest.useFakeTimers();
      const { container } = render(subject);
      expect(container.querySelector("img").src).toEqual(
        expect.stringMatching(/https:\/\/placegoat.com/i)
      );
    });

    it("gets a new image on the configured interval", async () => {
      jest.useFakeTimers();

      const { container } = render(subject);
      const initialImgSrc = container.querySelector("img").src;
      act(() => jest.advanceTimersByTime(refreshTime));
      expect(container.querySelector("img").src).not.toEqual(initialImgSrc);
    });
  });

  describe("when not fetching", () => {
    beforeEach(() => {
      subject = <Goat isFetching={false} refreshTime={refreshTime} />;
    });

    it("does not fetch images", async () => {
      jest.useFakeTimers();
      const { container } = render(subject);
      act(() => jest.advanceTimersByTime(refreshTime));
      expect(container.querySelector("img")).toBeFalsy();
    });
  });
});
