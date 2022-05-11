import cn from "classnames";

export const Button: React.FC<
  {
    variant?: "primary" | "secondary" | "danger";
  } & React.HTMLAttributes<HTMLButtonElement>
> = ({ children, variant = "primary", ...rest }) => {
  return (
    <button
      type="button"
      className={cn(
        " rounded-5 focus:ring-4 font-medium text-sm px-2 py-1 focus:outline-none ",
        variant === "primary" &&
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300",
        variant === "secondary" &&
          "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
