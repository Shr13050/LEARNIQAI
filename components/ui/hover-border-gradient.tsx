// "use client";
// import React, { useState, useEffect, useRef } from "react";

// import { motion } from "motion/react";
// import { cn } from "@/lib/utils";

// type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

// export function HoverBorderGradient({
//   children,
//   containerClassName,
//   className,
//   as: Tag = "button",
//   duration = 1,
//   clockwise = true,
//   ...props
// }: React.PropsWithChildren<
//   {
//     as?: React.ElementType;
//     containerClassName?: string;
//     className?: string;
//     duration?: number;
//     clockwise?: boolean;
//   } & React.HTMLAttributes<HTMLElement>
// >) {
//   const [hovered, setHovered] = useState<boolean>(false);
//   const [direction, setDirection] = useState<Direction>("TOP");

//   const rotateDirection = (currentDirection: Direction): Direction => {
//     const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
//     const currentIndex = directions.indexOf(currentDirection);
//     const nextIndex = clockwise
//       ? (currentIndex - 1 + directions.length) % directions.length
//       : (currentIndex + 1) % directions.length;
//     return directions[nextIndex];
//   };

//   const movingMap: Record<Direction, string> = {
//     TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     BOTTOM:
//       "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//     RIGHT:
//       "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
//   };

//   const highlight =
//     "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

//   useEffect(() => {
//     if (!hovered) {
//       const interval = setInterval(() => {
//         setDirection((prevState) => rotateDirection(prevState));
//       }, duration * 1000);
//       return () => clearInterval(interval);
//     }
//   }, [hovered]);
//   return (
//     <Tag
//       onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
//         setHovered(true);
//       }}
//       onMouseLeave={() => setHovered(false)}
//       className={cn(
//         "relative flex rounded-full border  content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
//         containerClassName
//       )}
//       {...props}
//     >
//       <div
//         className={cn(
//           "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
//           className
//         )}
//       >
//         {children}
//       </div>
//       <motion.div
//         className={cn(
//           "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
//         )}
//         style={{
//           filter: "blur(2px)",
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//         }}
//         initial={{ background: movingMap[direction] }}
//         animate={{
//           background: hovered
//             ? [movingMap[direction], highlight]
//             : movingMap[direction],
//         }}
//         transition={{ ease: "linear", duration: duration ?? 1 }}
//       />
//       <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
//     </Tag>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils";

// export function HoverBorderGradient({
//   children,
//   containerClassName,
//   className,
//   as: Tag = "button",
//   duration = 3, // Increased duration for even smoother transitions
//   index = 0, // Unique index for each button to create staggered effects
//   ...props
// }: React.PropsWithChildren<
//   {
//     as?: React.ElementType;
//     containerClassName?: string;
//     className?: string;
//     duration?: number;
//     index?: number;
//   } & React.HTMLAttributes<HTMLElement>
// >) {
//   // Define gradient effect
//   const gradientEffect = `
//     radial-gradient(75% 180% at 50% 50%, rgba(50, 117, 248, 0.8) 0%, rgba(255, 255, 255, 0) 100%)
//   `;

//   // Unique delay for each button to desynchronize animations
//   const randomDelay = (index % 3) * 1.2; // Offsets animation timing

//   return (
//     <Tag
//       className={cn(
//         "relative flex rounded-full border content-center bg-black/20 transition duration-500 dark:bg-white/20 items-center flex-col gap-10 justify-center overflow-visible p-px decoration-clone w-fit",
//         containerClassName
//       )}
//       {...props}
//     >
//       {/* Button Text */}
//       <div className={cn("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]", className)}>
//         {children}
//       </div>

//       {/* Smooth, Continuous Gradient Animation */}
//       <motion.div
//         className="absolute inset-0 z-0 rounded-[inherit]"
//         style={{
//           filter: "blur(4px)", // Slightly stronger blur for glowing effect
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//         }}
//         animate={{
//           opacity: [0.6, 1, 0.6], // Never fully disappears
//           background: [gradientEffect, gradientEffect], // Keep it persistent
//         }}
//         transition={{
//           ease: "linear",
//           duration: duration, // Smooth transitions
//           repeat: Infinity, // Loop animation infinitely
//           delay: randomDelay, // Each button starts at a different time
//         }}
//       />

//       {/* Dark Background for Better Contrast */}
//       <div className="bg-black absolute z-1 inset-[2px] rounded-[100px]" />
//     </Tag>
//   );
// }


"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 3, // Controls the speed of circular motion
  index = 0, // Unique index for desynchronizing animations
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    index?: number;
  } & React.HTMLAttributes<HTMLElement>
>) {
  // Unique delay per button to make animations desynchronized
  const randomDelay = (index % 3) * 1.5;

  return (
    <Tag
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 transition duration-500 dark:bg-white/20 items-center flex-col gap-10 justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      {/* Button Content */}
      <div className={cn("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]", className)}>
        {children}
      </div>

      {/* Animated Circular Gradient */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{
          filter: "blur(6px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        animate={{
          background: [
            "radial-gradient(20.7% 50% at 50% 0%, rgba(50, 117, 248, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
            "radial-gradient(16.6% 43.1% at 100% 0%, rgba(50, 117, 248, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
            "radial-gradient(20.7% 50% at 100% 100%, rgba(50, 117, 248, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
            "radial-gradient(16.2% 41.2% at 0% 100%, rgba(50, 117, 248, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
            "radial-gradient(20.7% 50% at 50% 0%, rgba(50, 117, 248, 0.8) 0%, rgba(255, 255, 255, 0) 100%)",
          ],
          opacity: [0.9, 1, 0.9], // Subtle brightness changes
        }}
        transition={{
          ease: "linear",
          duration: duration, // Circular movement speed
          repeat: Infinity,
          delay: randomDelay, // Ensures independent motion
        }}
      />

      {/* Dark Background for Contrast */}
      <div className="bg-black absolute z-1 inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
