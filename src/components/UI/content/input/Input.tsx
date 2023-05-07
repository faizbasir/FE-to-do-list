import React, { HTMLInputTypeAttribute } from "react";

interface inputProps {
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  id: string;
  valid: boolean;
  blur: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = (props: inputProps) => {
  return (
    <>
      <input
        type={props.type}
        value={props.value}
        className={`${
          props.blur && !props.valid ? "bg-pink" : ""
        } px-2 py-1 rounded-md text-sm`}
        onChange={props.onChange}
        id={props.id}
        onBlur={props.onBlur}
      />
      {props.blur && !props.valid && (
        <p className="text-sm mt-1 text-red">{`Please enter valid ${props.name}`}</p>
      )}
    </>
  );
};
export default Input;
