import moment from "moment";
import React from "react";
import "./styles/CalendarHeader.scss";
import { Dropdown } from "react-bootstrap";

const CalendarHeader = () => {
  // const [dateObject, setDateObject] = useState<Moment>(moment());
  // const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const months: string[] = moment.months();

  const selectMonthHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.innerHTML);
  };

  const monthsSelector = months.map((month) => (
    <Dropdown.Item href="" key={month} onClick={selectMonthHandler}>
      {month}
    </Dropdown.Item>
  ));

  let currentMonth = moment().format("MMMM");

  return (
    <>
      <div className="header-container bg-primary">
        <div className="mx-auto dropdown-months">
          <Dropdown className="">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {currentMonth}
            </Dropdown.Toggle>

            <Dropdown.Menu>{monthsSelector}</Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default CalendarHeader;
