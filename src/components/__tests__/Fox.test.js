import React from "react";
import { render, act, cleanup, waitFor } from "@testing-library/react";
import axios from "axios";
import { Fox } from "../Fox";

jest.spyOn(axios, "get").mockResolvedValue({ data: { file: "hello" } });

let subject;
let refreshTime = 5000;

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

describe("Fox", () => {
  describe("when fetching", () => {
    beforeEach(() => {
      subject = <Fox isFetching={true} refreshTime={refreshTime} />;
    });

    it("fetches an image on initial render", async () => {
      render(subject);
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    it("gets a new image on the configured interval", async () => {
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
      render(subject);

      act(() => jest.advanceTimersByTime(refreshTime));
      await waitFor(() => expect(axios.get).not.toHaveBeenCalled());
    });
  });
});
