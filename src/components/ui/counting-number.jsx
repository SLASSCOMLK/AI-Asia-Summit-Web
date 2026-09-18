import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export const CountingNumber = forwardRef(
  (
    {
      from = 0,
      target = 100,
      transition = { duration: 2.5, ease: "easeInOut", type: "tween" },
      className,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref,
  ) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) =>
      Math.round(latest).toLocaleString(),
    );
    const controlsRef = useRef(null);

    const startAnimation = useCallback(() => {
      controlsRef.current?.stop();
      onStart?.();
      count.set(from);
      controlsRef.current = animate(count, target, {
        ...transition,
        onComplete: () => onComplete?.(),
      });
    }, [from, target, transition, onStart, onComplete, count]);

    useImperativeHandle(ref, () => ({ startAnimation }));

    useEffect(() => {
      if (autoStart) startAnimation();
      return () => controlsRef.current?.stop();
    }, [autoStart, startAnimation]);

    return (
      <motion.span
        className={`tabular-nums${className ? ` ${className}` : ""}`}
        {...props}
      >
        {rounded}
      </motion.span>
    );
  },
);

CountingNumber.displayName = "CountingNumber";

export default CountingNumber;
