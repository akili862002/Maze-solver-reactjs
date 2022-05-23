import cn from "classnames";
import { ReactNode } from "react";

export const Button: React.FC<
  {
    variant?:
      | "primary"
      | "secondary"
      | "third"
      | "danger"
      | "warning"
      | "warning-secondary";
    disabled?: boolean;
    icon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
  } & React.HTMLAttributes<HTMLButtonElement>
> = ({
  className,
  disabled,
  children,
  loading,
  variant = "primary",
  icon = null,
  rightIcon = null,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={cn(
        " rounded-5 focus:ring-4 font-semibold text-sm  px-2 py-1 focus:outline-none flex flex-row gap-1 justify-center",
        variant === "primary" &&
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
        variant === "warning" &&
          "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300",
        variant === "third" &&
          "text-blue-700 bg-blue-200 hover:bg-blue-300 focus:ring-blue-200",
        variant === "warning-secondary" &&
          "text-yellow-400 bg-yellow-100 hover:bg-yellow-200 focus:ring-yellow-300",
        variant === "secondary" &&
          "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200",
        variant === "danger" &&
          " text-white bg-red-500 border border-gray-200 hover:bg-red-600  focus:z-10 focus:ring-4 focus:ring-gray-200",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
      {rightIcon}
    </button>
  );
};

const Spinner: React.FC = () => {
  return (
    <svg
      className={`animate-spin flex-shrink-0 w-2 h-2`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="20"
      height="20"
    >
      <circle
        className="opacity-20"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
