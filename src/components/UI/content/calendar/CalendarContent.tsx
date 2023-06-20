import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import "./styles/CalendarContent.scss";

const CalendarContent = () => {
  const [dateObject, setDateObject] = useState<Moment>(moment());

  useEffect(() => {
    setDateObject(moment());
  }, []);

  console.log(dateObject);
  const firstDayOfMonth = () => {
    let firstDay: number = Number(
      moment(dateObject).startOf("month").format("d")
    );
    return firstDay;
  };

  const daysInMonth = () => {
    let noOfDays: number = moment(dateObject).daysInMonth();
    return noOfDays;
  };

  let blankSpaces: JSX.Element[] = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blankSpaces.push(
      <td className="border" key={`empty-${i}`}>
        {""}
      </td>
    );
  }

  let filledSpaces: JSX.Element[] = [];
  for (let i = 1; i <= daysInMonth(); i++) {
    filledSpaces.push(
      <td className="border" key={i}>
        <p
          className={`px-2  ${
            Number(dateObject.format("D")) === i &&
            moment().format("MMMM") === dateObject.format("MMMM")
              ? "current-day"
              : ""
          }`}
        >
          {i}
        </p>
      </td>
    );
  }

  let totalSlots: JSX.Element[] = [...blankSpaces, ...filledSpaces];
  let blankCount: number = 0;

  while (totalSlots.length % 7 !== 0) {
    blankCount++;
    totalSlots.push(
      <td className="border" key={`empty-1-${blankCount}`}>
        {""}
      </td>
    );
  }

  let rows: JSX.Element[][] = [];
  let cells: JSX.Element[] = [];

  totalSlots.forEach((row: JSX.Element, i: number) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  let weekCount: number = 0;
  let weeks = rows.map((week) => {
    weekCount++;
    return <tr key={`week-${weekCount}`}>{week}</tr>;
  });

  return <>{weeks}</>;
};
export default CalendarContent;
