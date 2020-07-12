import React from "react";
import { render, act, cleanup, waitFor } from "@testing-library/react";
import axios from "axios";
import { Fox } from "../Fox";

jest.spyOn(axios, "get").mockResolvedValue({ data: { file: "hello" } });

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

let subject;
let refreshTime = 5000;

describe("Fox", () => {
  describe("when fetching", () => {
    beforeEach(() => {
      subject = <Fox isFetching={true} refreshTime={refreshTime} />;
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
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    });
  });

  describe("when not fetching", () => {
    beforeEach(() => {
      subject = <Fox isFetching={false} refreshTime={refreshTime} />;
    });

    it("does not fetch images", async () => {
      jest.useFakeTimers();
      render(subject);

      act(() => jest.advanceTimersByTime(refreshTime));
      await waitFor(() => expect(axios.get).not.toHaveBeenCalled());
    });
  });
});
