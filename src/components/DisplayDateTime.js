import React from "react";
import dateHelper, { dateHelperFn, displayTime } from "../helpers/dateHelper";

export function DisplayDateTime({ datetime }) {
  const { displayTime: destructuredDisplayTime } = dateHelperFn();

  console.log("default export:", dateHelper.displayTime(datetime));
  console.log(
    "destructured from named export:",
    destructuredDisplayTime(datetime)
  );

  return (
    <React.Fragment>
      <span>{displayTime(datetime)}</span>
    </React.Fragment>
  );
}
