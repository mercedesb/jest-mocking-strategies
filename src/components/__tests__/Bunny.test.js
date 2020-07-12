import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import { Bunny } from "../Bunny";

let subject;
let refreshTime = 5000;

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
  delete global.fetch;
});

describe("Bunny", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: () => Promise.resolve({ media: { poster: "hello" } }),
    });
  });

  describe("when fetching", () => {
    beforeEach(() => {
      subject = <Bunny isFetching={true} refreshTime={refreshTime} />;
    });

    it("fetches an image on initial render", async () => {
      render(subject);
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    });

    it("gets a new image on the configured interval", async () => {
      render(subject);
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      act(() => jest.advanceTimersByTime(refreshTime));
      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    });
  });

  describe("when not fetching", () => {
    beforeEach(() => {
      subject = <Bunny isFetching={false} refreshTime={refreshTime} />;
    });

    it("does not fetch images", async () => {
      render(subject);

      act(() => jest.advanceTimersByTime(refreshTime));
      await waitFor(() => expect(global.fetch).not.toHaveBeenCalled());
    });
  });
});
