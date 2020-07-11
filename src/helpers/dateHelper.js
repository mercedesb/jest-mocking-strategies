import moment from "moment";

export const displayDate = (datetime) => {
  return moment(datetime).format("MMM DD, YYYY hh:mm:ss");
};

export const displayTime = (datetime) => {
  return moment(datetime).format("hh:mm:ss");
};

export const dateHelperFn = () => {
  return {
    displayDate: displayDate,
    displayTime: displayTime,
  };
};

export default {
  displayDate: displayDate,
  displayTime: displayTime,
};
