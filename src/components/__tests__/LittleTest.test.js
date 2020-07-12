import React from "react";
import { render, act } from "@testing-library/react";
import { LittleTest } from "../LittleTest";

afterAll(() => {
  jest.useRealTimers();
});

let subject;
let refreshTime = 5000;
let func = jest.fn();

describe("LittleTest", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // needs to appear inside the closest describe
    // putting in the top-level (whole file) beforeEach resulted in intervalId being undefined
    jest.useFakeTimers();
    subject = <LittleTest func={func} refreshTime={refreshTime} />;
  });

  it("gets a new image on the configured interval", async () => {
    act(() => {
      render(subject);
    });
    act(() => jest.advanceTimersByTime(refreshTime));
    expect(func).toHaveBeenCalledTimes(2);
  });
});
