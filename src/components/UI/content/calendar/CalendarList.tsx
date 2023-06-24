import moment from "moment";
import React, { useState } from "react";
import CalendarContent from "./CalendarContent";
import CalendarHeader from "./CalendarHeader";
import "./styles/CalendarList.scss";

const CalendarList = () => {
  const [month, setMonth] = useState<number>(moment().month());

  const daysInWeek = moment.weekdaysShort().map((day) => {
    return (
      <th key={day} className="border">
        {day}
      </th>
    );
  });

  const monthChange = (selectedMonth: number) => {
    setMonth(selectedMonth);
    console.log(selectedMonth);
  };

  const monthShift = (shiftedMonth: number) => {
    setMonth(shiftedMonth);
  };

  return (
    <>
      <CalendarHeader onChange={monthChange} onShift={monthShift} />
      <div className="calendar-container">
        <table className="table table-striped table-fixed">
          <thead>
            <tr key={"header"} className="header-row">
              {daysInWeek}
            </tr>
          </thead>
          <tbody>
            <CalendarContent selectedMonth={month} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CalendarList;
