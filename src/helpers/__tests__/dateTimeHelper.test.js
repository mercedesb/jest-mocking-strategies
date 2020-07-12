import { toMoment, displayDate, displayTime } from "../dateTimeHelper";
import moment from "moment";

let mockFormat = jest.fn();
jest.mock("moment", () => ({
  __esModule: true,
  default: jest.fn(() => ({ format: mockFormat })),
}));

describe("toMoment", () => {
  it("calls moment() with the correct params", () => {
    const dateParam = new Date();
    toMoment(dateParam);
    expect(moment).toHaveBeenCalledWith(dateParam);
  });
});

describe("displayDate", () => {
  it("calls moment() with the correct params", () => {
    const dateParam = new Date();
    displayDate(dateParam);
    expect(moment).toHaveBeenCalledWith(dateParam);
  });

  it("calls moment().format with the correct params", () => {
    const dateParam = new Date();
    displayDate(dateParam);
    expect(mockFormat).toHaveBeenCalledWith("MMM DD, YYYY");
  });
});

describe("displayTime", () => {
  it("calls moment() with the correct params", () => {
    const dateParam = new Date();
    displayTime(dateParam);
    expect(moment).toHaveBeenCalledWith(dateParam);
  });

  it("calls moment().format with the correct params", () => {
    const dateParam = new Date();
    displayTime(dateParam);
    expect(mockFormat).toHaveBeenCalledWith("hh:mm:ss");
  });
});
