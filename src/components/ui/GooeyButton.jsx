import React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "lucide-react";

const gooeyButtonVariants = cva(
  "group relative  inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: " text-white bg-zinc-700   hover:bg-zinc-700/90",
        destructive: "bg-red-700 text-white hover:bg-red-700/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: " text-zinc-700 border-2 border-black bg-white underline-black underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 rounded-xs px-4 py-2 text-md font-senibold leading-2 tracking-wide",
        sm: "h-9 rounded-sm px-3",
        lg: "h-14 rounded-md px-5 py-3 text-lg font-bold leading-5 tracking-wide",
        xl: "h-16 rounded-xl px-6 py-5 text-xl font-bold leading-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

const GooeyButton = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      Icon = ArrowRightIcon,
      iconPlacement = "right",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="flex size-full items-center justify-center [filter:_url(#gooey)] z-[99999] fixed inset-0">
        <Comp
          className={cn(gooeyButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {Icon && iconPlacement === "left" && (
            <div className="absolute left-0 -z-10 grid aspect-square h-full w-auto translate-x-0 place-items-center rounded-[inherit] bg-inherit [transition:_all_0.5s_cubic-bezier(0.64,0.23,0.26,0.87)] group-hover:-translate-x-[130%]">
              <Icon />
            </div>
          )}
          <Slottable>{props.children}</Slottable>
          {Icon && iconPlacement === "right" && (
            <div className="absolute right-0 -z-10 grid aspect-square h-full w-auto translate-x-0 place-items-center rounded-[inherit] bg-inherit [transition:_all_0.5s_cubic-bezier(0.64,0.23,0.26,0.87)] group-hover:translate-x-[130%]">
              <Icon />
            </div>
          )}
        </Comp>
        <svg
          className="absolute hidden"
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="gooey">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
);

GooeyButton.displayName = "GooeyButton";

export { GooeyButton, gooeyButtonVariants };
