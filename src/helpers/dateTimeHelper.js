import moment from "moment";

export const toMoment = (datetime) => {
  return moment(datetime);
};

export const displayDate = (datetime) => {
  return moment(datetime).format("MMM DD, YYYY");
};

export const displayTime = (datetime) => {
  return moment(datetime).format("hh:mm:ss");
};
