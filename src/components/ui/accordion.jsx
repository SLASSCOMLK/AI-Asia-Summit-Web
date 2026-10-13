import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export function Accordion({
  children,
  type = "single",
  collapsible = true,
  defaultValue = null,
  value: controlledValue,
  onValueChange,
  className,
  ...props
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : uncontrolledValue;

  const toggleValue = (itemValue) => {
    let nextValue;
    if (activeValue === itemValue) {
      nextValue = collapsible ? null : itemValue;
    } else {
      nextValue = itemValue;
    }

    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    if (onValueChange) {
      onValueChange(nextValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ activeValue, toggleValue }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export const AccordionItem = React.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(AccordionContext);
    const isOpen = context?.activeValue === value;

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          data-state={isOpen ? "open" : "closed"}
          className={cn("border-b", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const itemContext = useContext(AccordionItemContext);
    const accordionContext = useContext(AccordionContext);
    const isOpen = itemContext?.isOpen;

    const handleClick = () => {
      if (itemContext?.value && accordionContext?.toggleValue) {
        accordionContext.toggleValue(itemContext.value);
      }
    };

    return (
      <div className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          onClick={handleClick}
          className={cn(
            "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:no-underline [&[data-state=open]>svg]:rotate-180 cursor-pointer text-left bg-transparent border-0 outline-none",
            className
          )}
          {...props}
        >
          <span>{children}</span>
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
      </div>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const itemContext = useContext(AccordionItemContext);
    const isOpen = itemContext?.isOpen;

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        data-state={isOpen ? "open" : "closed"}
        className="overflow-hidden text-sm transition-all"
        {...props}
      >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";
