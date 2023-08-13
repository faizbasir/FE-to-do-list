import React from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import "./styles/Modal.scss";
import { useAppDispatch } from "../../store/store";
import { deleteTask } from "../../store/todoSlice";

interface Props {
  toDelete?: boolean;
  header: string;
  id: number;
  summary: string;
  completed: boolean;
  dueDate: string;
  show: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const ViewModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const deleteHandler = () => {
    dispatch(deleteTask(props.id));
    props.onCancel;
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={props.onCancel}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card d-flex flex-row modal-card">
            <div className="card-body modal-card-body-id">ID</div>
            <div className="card-body modal-card-body">Summary</div>
            <div className="card-body modal-card-body">Due Date</div>
            <div className="card-body modal-card-body">Status</div>
          </div>
          <div className="card d-flex flex-row modal-card">
            <div className="card-body modal-card-body-id">{props.id}</div>
            <div className="card-body modal-card-body">{props.summary}</div>
            <div className="card-body modal-card-body">{props.dueDate}</div>
            <div className="card-body modal-card-body">{`${
              props.completed
                ? "Completed"
                : moment().format("YYYY-MM-DD") > props.dueDate
                ? "Overdue"
                : "Pending"
            }`}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {props.toDelete && (
            <Button variant="danger" onClick={deleteHandler}>
              Delete
            </Button>
          )}
          <Button onClick={props.onCancel}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewModal;
