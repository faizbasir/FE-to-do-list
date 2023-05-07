import React from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  target: string;
  children: any;
}

export const Portal: React.FunctionComponent<PortalProps> = ({
  target,
  children,
}) => {
  const portalElement = document.getElementById(target);

  return portalElement ? ReactDOM.createPortal(children, portalElement) : null;
};
