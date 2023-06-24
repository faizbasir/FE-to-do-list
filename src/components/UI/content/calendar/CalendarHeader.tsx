import moment from "moment";
import React, { useState } from "react";
import "./styles/CalendarHeader.scss";
import { Dropdown } from "react-bootstrap";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";

interface monthProp {
  onChange: (monthIndex: number) => void;
  onShift: (monthNumber: number) => void;
}

const CalendarHeader = (props: monthProp) => {
  const [month, setMonth] = useState<string>(moment().format("MMMM"));
  const months: string[] = moment.months();

  const selectMonthHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setMonth(e.currentTarget.innerHTML);
    props.onChange(months.indexOf(e.currentTarget.innerHTML));
  };

  const previousMonthShiftHandler = () => {
    if (month !== "January") {
      setMonth(months[months.indexOf(month) - 1]);
      props.onShift(months.indexOf(month) - 1);
    }
  };

  const nextMonthShiftHandler = () => {
    if (month !== "December") {
      setMonth(months[months.indexOf(month) + 1]);
      props.onShift(months.indexOf(month) + 1);
    }
  };

  const monthsSelector = months.map((month) => (
    <Dropdown.Item href="" key={month} onClick={selectMonthHandler}>
      {month}
    </Dropdown.Item>
  ));

  return (
    <>
      <div className="header-container bg-primary">
        <ChevronLeft
          className="chevron-icon"
          onClick={previousMonthShiftHandler}
        />
        <div className="mx-auto dropdown-button">
          <Dropdown className="">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {month}
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-months">
              {monthsSelector}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <ChevronRight
          className="chevron-icon"
          onClick={nextMonthShiftHandler}
        />
      </div>
    </>
  );
};
export default CalendarHeader;
