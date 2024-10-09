import React from "react";

export const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-md ${className}`}>{children}</div>
);

export const AlertTitle = ({ children }) => (
  <h5 className="text-lg font-semibold mb-1">{children}</h5>
);

export const AlertDescription = ({ children }) => <p>{children}</p>;
