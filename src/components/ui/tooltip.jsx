
import React from "react";

const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger = ({ children }) => {
  return <>{children}</>;
};

const TooltipContent = ({ children, className, ...props }) => {
  return <div className={className} {...props}>{children}</div>;
};

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
