import React from "react";

interface FormErrorProps {
  message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive/15 p-3 rounded-md text-sm border border-destructive text-destructive">
      {message}
    </div>
  );
};