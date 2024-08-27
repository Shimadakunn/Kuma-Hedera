import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-secondary/40 text-secondary-background hover:bg-secondary/50",
        destructive:
          "bg-destructive/60 text-destructive-foreground hover:bg-destructive/70",
        outline:
          "border border-secondary bg-secondary/10 hover:bg-secondary/20 hover:text-secondary-foreground",
        destructiveoutline:
            "border border-destructive/90 text-red-400 bg-background hover:bg-destructive/20 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        footer:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl",
        ghost: "",
        link: "text-secondary underline-offset-4 underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-10 px-4 py-6",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 p-3",
        link: 'p-0'
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
