import React, { ReactNode } from "react";

interface Props {
  footer: ReactNode;
  header: string;
  content: string;
}

const Modal = (props: Props) => {
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm">
        <div className="bg-secondary w-[60%] mx-auto mt-24 rounded-lg">
          <header className="text-primary text-center py-4">
            {props.header}
          </header>
          <div className="text-primary text-center py-4">{props.content}</div>
          <footer>{props.footer}</footer>
        </div>
      </div>
    </>
  );
};

export default Modal;
