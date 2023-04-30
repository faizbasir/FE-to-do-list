import React, { HTMLInputTypeAttribute } from "react";

interface inputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: inputProps) => {
  return (
    <>
      <input
        type={props.type}
        value={props.value}
        className="px-2 py-1 rounded-md text-sm"
        onChange={props.onChange}
      />
      <p className="text-sm mt-1 text-red">{`Please enter valid ${props.name}`}</p>
    </>
  );
};
export default Input;
