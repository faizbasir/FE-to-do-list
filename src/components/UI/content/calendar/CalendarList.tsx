import moment, { Moment } from "moment";
import React, { useState } from "react";
import { Transition } from "@headlessui/react";

const CalendarList = () => {
  const [month, setMonth] = useState<Moment>(moment());
  const [showMonths, setShowMonths] = useState<boolean>(false);
  const dateState = {
    dateObject: moment(),
    allMonths: moment.months(),
  };

  const showMonthHandler = () => {
    setShowMonths(!showMonths);
  };

  const selectMonthHandler = (e: React.MouseEvent<HTMLElement>) => {
    let monthNo = dateState.allMonths.indexOf(e.currentTarget.innerHTML);
    setMonth(moment().set("month", monthNo));
    setShowMonths(!showMonths);
  };

  let months: JSX.Element[] = [];
  dateState.allMonths.map((month) => {
    months.push(
      <td
        key={month}
        className="text-center py-2 cursor-default"
        onClick={selectMonthHandler}
      >
        {month}
      </td>
    );
  });

  let monthRows = [];
  let monthCells: JSX.Element[] = [];

  months.forEach((row, i) => {
    if (i % 3 !== 0) {
      monthCells.push(row);
    } else {
      monthRows.push(monthCells);
      monthCells = [];
      monthCells.push(row);
    }
  });
  monthRows.push(monthCells);

  let monthRowCount: number = 0;
  let monthList = monthRows.map((d) => {
    monthRowCount++;
    return <tr key={monthRowCount}>{d}</tr>;
  });

  const firstDayOfMonth = () => {
    let dateObject = month;
    let firstDay: number = Number(
      moment(dateObject).startOf("month").format("d")
    );
    return firstDay;
  };

  const daysInMonth = () => {
    let dateObject = month;
    let noOfDays: number = moment(dateObject).daysInMonth();
    return noOfDays;
  };

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <td className="border bg-lightgray h-24" key={`empty-${i}`}>
        {""}
      </td>
    );
  }

  let filledSpaces = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    filledSpaces.push(
      <td className="border h-24 text-sm text-right align-top px-2" key={d}>
        {d}
      </td>
    );
  }

  let totalSlots = [...blanks, ...filledSpaces];
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

  const weekdaysShortName = moment.weekdaysShort().map((day) => {
    return (
      <th key={day} className="text-secondary border">
        {day}
      </th>
    );
  });

  return (
    <>
      <p
        className="mt-12 py-2 w-[90%] mx-auto text-center text-primary bg-secondary cursor-default"
        onClick={showMonthHandler}
      >
        {month.format("MMMM")}
      </p>
      <Transition
        show={showMonths}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <table
          className={`table-fixed w-[90%] mx-auto ${
            showMonths
              ? "animate-in fade-in duration-500"
              : "animate-out fade-out duration-500"
          }`}
        >
          <tbody>{monthList}</tbody>
        </table>
      </Transition>
      <Transition show={true}>
        <table
          className={`table-fixed w-[90%] mx-auto ${showMonths ? "" : ""}`}
        >
          <thead>
            <tr key={"header"}>{weekdaysShortName}</tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </Transition>
    </>
  );
};

export default CalendarList;
