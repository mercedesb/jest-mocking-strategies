// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { SessionStorageMock } from "./testHelpers/sessionStorageMock";

const unmockedSessionStorage = global.sessionStorage;

beforeAll(() => {
  global.sessionStorage = new SessionStorageMock();
});

afterAll(() => {
  global.sessionStorage = unmockedSessionStorage;
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);
