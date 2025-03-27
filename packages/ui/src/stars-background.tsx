"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import * as React from "react";
import { cn } from "./lib/utils";

interface StarLayerProps {
  count: number;
  size: number;
  duration: number;
}

const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const generateStars = (count: number, size: number, seed: number) => {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(seededRandom(seed + i) * 4000) - 2000;
    const y = Math.floor(seededRandom(seed + i + 1000) * 4000) - 2000;
    shadows.push(`${x}px ${y}px #000`);
  }
  return shadows.join(", ");
};

const StarLayer = ({ count, size, duration }: StarLayerProps) => {
  const boxShadow = React.useMemo(
    () => generateStars(count, size, 0),
    [count, size]
  );

  return (
    <motion.div
      animate={{ y: [0, -2000] }}
      transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-[2000px]"
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
};

interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  factor?: number;
  speed?: number;
  stiffness?: number;
  damping?: number;
}

const StarsBackground = React.forwardRef<HTMLDivElement, StarsBackgroundProps>(
  (
    {
      children,
      className,
      factor = 0.05,
      speed = 50,
      stiffness = 50,
      damping = 20,
      ...props
    },
    ref
  ) => {
    const offsetX = useMotionValue(1);
    const offsetY = useMotionValue(1);

    const springX = useSpring(offsetX, { stiffness, damping });
    const springY = useSpring(offsetY, { stiffness, damping });

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newOffsetX = -(e.clientX - centerX) * factor;
        const newOffsetY = -(e.clientY - centerY) * factor;
        offsetX.set(newOffsetX);
        offsetY.set(newOffsetY);
      },
      [offsetX, offsetY, factor]
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]",
          className
        )}
        onMouseMove={handleMouseMove}
        {...props}
      >
        <motion.div style={{ x: springX, y: springY }}>
          <StarLayer count={1000} size={1} duration={speed} />
          <StarLayer count={400} size={2} duration={speed * 2} />
          <StarLayer count={200} size={3} duration={speed * 3} />
        </motion.div>
        {children}
      </div>
    );
  }
);

StarsBackground.displayName = "StarsBackground";

export { StarsBackground, type StarsBackgroundProps };
