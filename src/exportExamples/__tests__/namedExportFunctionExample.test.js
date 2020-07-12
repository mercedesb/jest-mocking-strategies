import { example } from "../namedExportObjectExample";

const mockExpected = "mock value";
jest.mock("../namedExportObjectExample", () => ({
  example: jest.fn(() => mockExpected),
}));

it("returns the expected value", () => {
  const actual = example();
  expect(actual).toEqual(mockExpected);
});
