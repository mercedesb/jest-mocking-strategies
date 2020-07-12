import example from "../defaultExportFunctionExample";

const mockExpected = "mock value";
jest.mock("../defaultExportFunctionExample", () => jest.fn(() => mockExpected));

it("returns the expected value", () => {
  const actual = example();
  expect(actual).toEqual(mockExpected);
});
