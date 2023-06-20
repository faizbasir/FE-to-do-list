import moment from "moment";
import React from "react";
import CalendarContent from "./CalendarContent";
import CalendarHeader from "./CalendarHeader";
import "./styles/CalendarList.scss";

const CalendarList = () => {
  const daysInWeek = moment.weekdaysShort().map((day) => {
    return (
      <th key={day} className="border">
        {day}
      </th>
    );
  });

  return (
    <>
      <CalendarHeader />
      <div className="calendar-container">
        <table className="table table-striped">
          <thead>
            <tr key={"header"}>{daysInWeek}</tr>
          </thead>
          <tbody>
            <CalendarContent />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarList;
