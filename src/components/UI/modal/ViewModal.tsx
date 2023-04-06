import React from "react";

interface Props {
  header: string;
  id: string;
  summary: string;
  completed: boolean;
  dueDate: string;
  onCancel: () => void;
}

const ViewModal = (props: Props) => {
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm">
        <div className="bg-secondary w-[30%] mx-auto mt-24 rounded-lg">
          <header className="text-primary text-center pt-4">
            {props.header}
          </header>
          <div className="flex flex-row justify-center mt-4">
            <div className="w-fit mx-4">
              <p className="text-primary text-sm mt-2">ID</p>
              <p className="text-primary text-sm mt-2">Summary</p>
              <p className="text-primary text-sm mt-2">Due Date</p>
              <p className="text-primary text-sm mt-2">Completed</p>
            </div>
            <div className="w-fit mx-4">
              <p className="text-primary text-sm mt-2">{props.id}</p>
              <p className="text-primary text-sm mt-2">{props.summary}</p>
              <p className="text-primary text-sm mt-2">{props.dueDate}</p>

              <p className="text-primary text-sm mt-2">
                {props.completed ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <footer className="p-4">
            <button
              className="bg-gray py-1 px-2 rounded-lg hover:bg-darkgray text-sm"
              onClick={props.onCancel}
            >
              Close
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
