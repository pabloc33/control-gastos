import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ErrorMessage = ({ children }: Props) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
      {children}
    </p>
  );
};
