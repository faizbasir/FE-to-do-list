import React, { SyntheticEvent } from "react";

const Form = () => {
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className="mt-12 w-[70%] mx-auto flex justify-center"
      >
        <input
          type="text"
          className="bg-secondary px-2 py-1 rounded-lg w-[70%] text-primary mr-8"
        />
        <button
          type="submit"
          className="bg-gray px-2 py-1 rounded-lg hover:bg-darkgray"
        >
          Create new task
        </button>
      </form>
    </>
  );
};

export default Form;
