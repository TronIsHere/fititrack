import * as React from "react";

import { cn } from "@/lib/utils";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEye, IoEyeOff } from "react-icons/io5";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isPassword, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    let inputType;
    if (isPassword) {
      inputType = showPassword ? "text" : "password";
    } else {
      inputType = type;
    }
    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword ? (
          <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 pt-2 text-gray-400">
            {showPassword ? (
              <IoEyeOff
                className="h-4 w-4"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEye className="h-4 w-4" onClick={togglePasswordVisibility} />
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
