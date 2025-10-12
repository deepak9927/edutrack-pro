import React from "react";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({
  message,
}) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-green-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-green-500">
      {message}
    </div>
  );
};