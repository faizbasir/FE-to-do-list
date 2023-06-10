import moment, { Moment } from "moment";
import React, { useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const CalendarHeader = () => {
  const [dateObject, setDateObject] = useState<Moment>(moment());
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const months: string[] = moment.months();

  const selectMonthHandler = () => {
    setDateObject(moment());
    setShowDropDown(!showDropDown);
  };

  const displayedMonths = months.map((month) => {
    return (
      <p
        key={month}
        className="bg-lightgray p-2 cursor-default hover:bg-primary"
      >
        {month}
      </p>
    );
  });

  let contentMenu = (
    <>
      {dateObject.format("MMMM")}
      {displayedMonths}
      <ChevronDownIcon
        className="ml-2 -mr-1 h-5 w-5"
        onClick={selectMonthHandler}
      />
    </>
  );

  return (
    <>
      <div className="flex justify-between mt-12 py-2 bg-secondary w-[90%] mx-auto">
        <ChevronLeftIcon className="h-5 text-primary mt-2 ml-2" />
        {contentMenu}
        <ChevronRightIcon className="h-5 text-primary mt-2 mr-2" />
      </div>
    </>
  );
};
export default CalendarHeader;
