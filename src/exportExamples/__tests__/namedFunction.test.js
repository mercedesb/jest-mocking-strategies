import { example } from "../namedFunction";

const mockExpected = "mock value";
jest.mock("../namedFunction", () => ({
  example: jest.fn(() => mockExpected),
}));

it("returns the expected value", () => {
  const actual = example();
  expect(actual).toEqual(mockExpected);
});
