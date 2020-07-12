import example from "../defaultFunction";

const mockExpected = "mock value";
jest.mock("../defaultFunction", () => jest.fn(() => mockExpected));

it("returns the expected value", () => {
  const actual = example();
  expect(actual).toEqual(mockExpected);
});
