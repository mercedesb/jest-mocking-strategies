import React from "react";
import moment from "moment";

export function DisplayDateTime({ datetime }) {
  return <span>{moment(datetime).format("MMM DD, YYYY hh:mm:ss")}</span>;
}
