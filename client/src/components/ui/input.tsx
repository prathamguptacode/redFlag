// import * as React from "react"
// import { Input as InputPrimitive } from "@base-ui/react/input"
//
// import { cn } from "../../../lib/utils"
//
// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <InputPrimitive
//       type={type}
//       data-slot="input"
//       className={cn(
//         "h-12 w-full min-w-0 rounded border-2 bg-input px-3 py-2 text-sm shadow-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive focus:border-amber-200",
//         className
//       )}
//       {...props}
//     />
//   )
// }
//
// export { Input }
import React, { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`px-4 py-2 w-full rounded border-2 shadow-md transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary focus:shadow-xs ${props["aria-invalid"]
        ? "border-destructive text-destructive shadow-xs shadow-destructive"
        : ""
        } ${className}`}
      {...props}
    />
  );
};

