import React, { useReducer } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import formReducer from "../../../reducer/formReducer";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { addTask } from "../../../store/todoSlice";
import "./styles/EntryForm.scss";

const EntryForm = () => {
  const appDispatch = useAppDispatch();
  const taskList = useAppSelector((state) => state.todo.tasks);
  const [inputState, dispatch] = useReducer(formReducer, {
    summary: { value: "", isValid: false, isTouched: false },
    date: { value: "", isValid: false, isTouched: false },
  });
  const maxId: number[] = [];
  taskList.map((task) => maxId.push(task.id));

  const submitHandler = (e: React.SyntheticEvent) => {
    console.log(inputState);
    e.preventDefault();
    appDispatch(
      addTask({
        summary: inputState.summary.value,
        id: Math.max(...maxId) + 1,
        dueDate: inputState.date.value,
        completed: false,
      })
    );
    dispatch({
      type: "CLEAR_FIELDS",
      payload: {
        id: "",
        value: "",
      },
    });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { id: e.currentTarget.id, value: e.currentTarget.value },
    });
  };

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: "ON_TOUCH",
      payload: { id: e.currentTarget.id, value: "" },
    });
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row className="align-items-center">
          <Form.Group as={Col} md="8">
            <Form.Label visuallyHidden>Summary</Form.Label>
            <Form.Control
              className="input-field"
              type="text"
              placeholder="Summary"
              id="summary"
              required
              value={inputState.summary.value}
              onChange={changeHandler}
              onBlur={blurHandler}
              isInvalid={
                inputState.summary.isTouched && !inputState.summary.isValid
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid summary.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label visuallyHidden>Date</Form.Label>
            <Form.Control
              className="input-field"
              type="date"
              id="date"
              value={inputState.date.value}
              onChange={changeHandler}
              onBlur={blurHandler}
              isInvalid={!inputState.date.isValid && inputState.date.isTouched}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid date.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="1">
            <Button
              type="submit"
              disabled={
                inputState.date.isValid === true &&
                inputState.summary.isValid === true
                  ? false
                  : true
              }
              variant={
                inputState.date.isValid === true &&
                inputState.summary.isValid === true
                  ? "primary"
                  : "secondary"
              }
            >
              +
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};
export default EntryForm;
