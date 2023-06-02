import moment from "moment";
import React from "react";
import CalendarContent from "./CalendarContent";
import CalendarHeader from "./CalendarHeader";

const CalendarList = () => {
  const daysInWeek = moment.weekdaysShort().map((day) => {
    return (
      <th key={day} className="text-secondary border">
        {day}
      </th>
    );
  });

  return (
    <>
      <CalendarHeader />
      <table className={`table-fixed w-[90%] mx-auto`}>
        <thead>
          <tr key={"header"}>{daysInWeek}</tr>
        </thead>
        <tbody>
          <CalendarContent />
        </tbody>
      </table>
    </>
  );
};

export default CalendarList;
