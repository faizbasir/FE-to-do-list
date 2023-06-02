import moment, { Moment } from "moment";
import React, { Fragment, useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

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
    <Menu as="div" className="relative inline-block text-left">
      <div className="">
        <Menu.Button
          onClick={selectMonthHandler}
          className="inline-flex justify-center px-4 py-2 text-sm text-primary"
        >
          {dateObject.format("MMMM")}
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" />
        </Menu.Button>
      </div>
      {showDropDown && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items>
            <Menu.Item as="div" className="absolute z-40 mt-2">
              {displayedMonths}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
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
