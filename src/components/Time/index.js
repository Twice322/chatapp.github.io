import React, { Fragment } from "react";
import ruLocale from "date-fns/locale/ru";
import { formatDistanceToNow } from "date-fns";

const Time = ({ created_at }) => {
  const newDate = new Date(created_at);
  
  return (
    <Fragment>
      {formatDistanceToNow(newDate, {
        addSuffix: true,
        locale: ruLocale,
      })}
    </Fragment>
  );
};
export default Time;
