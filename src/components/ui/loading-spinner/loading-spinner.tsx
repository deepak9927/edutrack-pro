import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
    variants: {
      size: {
        default: "h-6 w-6",
        sm: "h-4 w-4 border-2",
        lg: "h-8 w-8 border-4",
        xl: "h-12 w-12 border-8",
      },
      color: {
        primary: "text-primary",
        secondary: "text-secondary",
        white: "text-white",
        black: "text-black",
        muted: "text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      color: "primary",
    },
  }
);

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

/**
 * @typedef {Object} LoadingSpinnerProps
 * @extends React.HTMLAttributes<HTMLDivElement>
 * @property {"default" | "sm" | "lg" | "xl"} [size="default"] - The size of the spinner.
 * @property {"primary" | "secondary" | "white" | "black" | "muted"} [color="primary"] - The color of the spinner.
 */

/**
 * A customizable loading spinner component.
 *
 * @param {LoadingSpinnerProps} props - The props for the LoadingSpinner component.
 * @returns {JSX.Element} A loading spinner.
 */
const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(spinnerVariants({ size, color }), className)}
        {...props}
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner, spinnerVariants };