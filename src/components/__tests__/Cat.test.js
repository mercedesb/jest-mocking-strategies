import React from "react";
import { render, act, cleanup, waitFor } from "@testing-library/react";
import axios from "axios";
import { Cat } from "../Cat";

jest.spyOn(axios, "get").mockResolvedValue({ data: { file: "hello" } });

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

let subject;
let refreshTime = 5000;

describe("Cat", () => {
  describe("when fetching", () => {
    beforeEach(() => {
      // needs to appear inside a describe
      // putting in the top-level (whole file) beforeEach resulted in intervalId being undefined
      // jest.useFakeTimers();
      subject = <Cat isFetching={true} refreshTime={refreshTime} />;
    });

    it("fetches an image on initial render", async () => {
      jest.useFakeTimers();
      render(subject);
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    it("gets a new image on the configured interval", async () => {
      jest.useFakeTimers();
      render(subject);
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
      act(() => jest.advanceTimersByTime(refreshTime));
      // if you're seeing the not wrapped in act error, try await waitFor
      // if you see "waitFor is not a function" upgrade @testing-library/react to major version 10
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    });
  });

  describe("when not fetching", () => {
    beforeEach(() => {
      subject = <Cat isFetching={false} refreshTime={refreshTime} />;
    });

    it("does not fetch images", async () => {
      jest.useFakeTimers();
      render(subject);

      act(() => jest.advanceTimersByTime(refreshTime));
      await waitFor(() => expect(axios.get).not.toHaveBeenCalled());
    });
  });
});
