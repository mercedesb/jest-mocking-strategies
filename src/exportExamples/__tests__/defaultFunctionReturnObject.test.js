import * as exampleModule from "../defaultFunctionReturnObject";

const mockExpected = "mock value";
jest.spyOn(exampleModule, "default").mockImplementation(() => ({
  getValue: jest.fn(() => mockExpected),
}));

it("returns the expected value", () => {
  const { getValue } = exampleModule.default();
  const actual = getValue();
  expect(actual).toEqual(mockExpected);
});
