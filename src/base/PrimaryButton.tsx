import { ButtonHTMLAttributes, FC } from "react";
import ActivityIndicator from "./ActivityIndicator";

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  isLoading,
  ...others
}) => {
  return (
    <button
      disabled={isLoading}
      {...others}
      className="rounded-md bg-green-850 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      {isLoading ? <ActivityIndicator color="fill-white" /> : children}
    </button>
  );
};

export default PrimaryButton;
