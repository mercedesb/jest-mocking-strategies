import example from "../defaultExportFunctionExample";

const mockExpected = "mock value";
jest.mock("../defaultExportFunctionExample", () => jest.fn());

it("returns the expected value", () => {
  example.mockReturnValue(mockExpected);
  const actual = example();
  expect(actual).toEqual(mockExpected);
});
