import moment from "moment";
import React, { useState } from "react";
import "./styles/CalendarHeader.scss";
import { Dropdown } from "react-bootstrap";

interface monthProp {
  onChange: (monthIndex: number) => void;
}

const CalendarHeader = (props: monthProp) => {
  const [month, setMonth] = useState<string>(moment().format("MMMM"));
  const months: string[] = moment.months();

  const selectMonthHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setMonth(e.currentTarget.innerHTML);
    props.onChange(months.indexOf(e.currentTarget.innerHTML));
  };

  const monthsSelector = months.map((month) => (
    <Dropdown.Item href="" key={month} onClick={selectMonthHandler}>
      {month}
    </Dropdown.Item>
  ));

  return (
    <>
      <div className="header-container bg-primary">
        <div className="mx-auto dropdown-months">
          <Dropdown className="">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {month}
            </Dropdown.Toggle>

            <Dropdown.Menu>{monthsSelector}</Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default CalendarHeader;
