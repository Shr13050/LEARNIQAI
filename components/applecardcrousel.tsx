// "use client";
// import Image from "next/image";
// import React from "react";
// import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

// export function AppleCardsCarouselDemo() {
//   const cards = data.map((card, index) => (
//     <Card key={card.src} card={card} index={index} />
//   ));

//   return (
//     <div className="w-full h-full py-20">
//       <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
//       Features That Drive Success – See What’s Inside!
//       </h2>
//       <Carousel items={cards} />
//     </div>
//   );
// }

// const DummyContent = () => {
//   return (
//     <>
//       {[...new Array(3).fill(1)].map((_, index) => {
//         return (
//           <div
//             key={"dummy-content" + index}
//             className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
//           >
//             {/* <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
//               <span className="font-bold text-neutral-700 dark:text-neutral-200">
//                 The first rule of Apple club is that you boast about Apple club.
//               </span>{" "}
//               Keep a journal, quickly jot down a grocery list, and take amazing
//               class notes. Want to convert those notes to text? No problem.
//               Langotiya jeetu ka mara hua yaar is ready to capture every
//               thought.
//             </p> */}
//             {/* <Image
//               src="/LEARNIQAI.png"
//               alt=""
//               height="500"
//               width="500"
//               className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
//             /> */}
//           </div>
//         );
//       })}
//     </>
//   );
// };

// const data = [
//   {
//     category: "Artificial Intelligence",
//     title: "You can do more with AI.",
//     src: "/crousel1.jpg",
//     content: <DummyContent />,
//   },
//   {
//     category: "Productivity",
//     title: "Enhance your productivity.",
//     src: "/cr2.png",    content: <DummyContent />,
//   },
//   {
//     category: "Product",
//     title: "Launching the new Apple Vision Pro.",
//     src: "/cr5.jpeg",    content: <DummyContent />,
//   },
//   {
//     category: "Product",
//     title: "Maps for your iPhone 15 Pro Max.",
//     src: "/cr3.png",    content: <DummyContent />,
//   },
//   {
//     category: "iOS",
//     title: "Photography just got better.",
//     src: "/cr4.jpeg",    content: <DummyContent />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "/LEARNIQAI.png",    content: <DummyContent />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "/cr6.png",    content: <DummyContent />,
//   },
// ];
"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <div key={card.src} className="relative">
      {/* Explore Now Button wrapped in a Link */}
      <Link href={card.href}>
        <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-white text-black font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-300 transition duration-300">
          Explore Now
        </button>
      </Link>
      <Card card={card} index={index} />
    </div>
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Features That Drive Success – See What’s Inside!
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => (
        <div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        />
      ))}
    </>
  );
};

const data = [
  {
    category: "Personalised Learning Hub",
    title: "Learning That Evolves with You",
    src: "/crousel1.jpg",
    content: <DummyContent />,
    href: "#plh",
  },
  {
    category: "Smart PDF Tutor",
    title: "Transform PDFs Into Interactive Tutors",
    src: "/cr2.png",
    content: <DummyContent />,
    href: "#spt",
  },
  {
    category: "Research Paper Summarizer",
    title: "Streamline Research with AI-Driven Paper Summaries and audio.",
    src: "/cr5.jpeg",
    content: <DummyContent />,
    href: "#rps",
  },
  {
    category: "Career-Ready Resume Optimizer",
    title: "Optimize your resume with AI-driven recommendations that align with job market demands",
    src: "/cr3.png",
    content: <DummyContent />,
    href: "#cro",
  },
  {
    category: "AI Content Creator",
    title: "Generate compelling content with AI that meets academic standards",
    src: "/cr4.jpeg",
    content: <DummyContent />,
    href: "#acc",
  },
  {
    category: "Personal Productivity Planner",
    title: "Unmatched productivity that keeps you on track and goal-oriented.",
    src: "/cr8.png",
    content: <DummyContent />,
    href: "#ppp",
  },
  {
    category: "GitHub Repository Assistant",
    title: "Engage with complex code repositories effortlessly",
    src: "/cr6.png",
    content: <DummyContent />,
    href: "#gra",
  },
];



// "use client";

// import Image, { ImageProps } from "next/image";
// import React, { useEffect, useState, useRef, createContext, useContext, JSX } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // or "motion/react" if you prefer
// import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
// import { cn } from "@/lib/utils";
// import { useOutsideClick } from "@/hooks/use-outside-click";

// // -----------------------
// // Carousel Context & Types
// // -----------------------

// type CardType = {
//   category: string;
//   title: string;
//   src: string;
//   content: React.ReactNode;
// };

// interface CarouselContextType {
//   onCardClose: (index: number) => void;
//   currentIndex: number;
// }

// export const CarouselContext = createContext<CarouselContextType>({
//   onCardClose: () => {},
//   currentIndex: 0,
// });

// // -----------------------
// // Carousel Component
// // -----------------------

// interface CarouselProps {
//   items: JSX.Element[];
//   initialScroll?: number;
// }

// export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollLeft = initialScroll;
//       checkScrollability();
//     }
//   }, [initialScroll]);

//   const checkScrollability = () => {
//     if (carouselRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
//     }
//   };

//   const scrollLeft = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   const handleCardClose = (index: number) => {
//     if (carouselRef.current) {
//       const cardWidth = isMobile() ? 230 : 384; // adjust according to your design
//       const gap = isMobile() ? 4 : 8;
//       const scrollPosition = (cardWidth + gap) * (index + 1);
//       carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
//       setCurrentIndex(index);
//     }
//   };

//   const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

//   return (
//     <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
//       <div className="relative w-full">
//         <div
//           className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
//           ref={carouselRef}
//           onScroll={checkScrollability}
//         >
//           <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>
//           <div className={cn("flex flex-row justify-start gap-4 pl-4", "max-w-7xl mx-auto")}>
//             {items.map((item, index) => (
//               <motion.div
//                 key={`card-${index}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut", once: true } }}
//                 className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
//               >
//                 {item}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-end gap-2 mr-10">
//           <button
//             className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
//             onClick={scrollLeft}
//             disabled={!canScrollLeft}
//           >
//             <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
//           </button>
//           <button
//             className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
//             onClick={scrollRight}
//             disabled={!canScrollRight}
//           >
//             <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
//           </button>
//         </div>
//       </div>
//     </CarouselContext.Provider>
//   );
// };

// // -----------------------
// // Card Component
// // -----------------------

// export const Card = ({
//   card,
//   index,
//   layout = false,
// }: {
//   card: CardType;
//   index: number;
//   layout?: boolean;
// }) => {
//   const [open, setOpen] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { onCardClose } = useContext(CarouselContext);

//   useEffect(() => {
//     const onKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         handleClose();
//       }
//     };

//     document.body.style.overflow = open ? "hidden" : "auto";
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [open]);

//   useOutsideClick(containerRef as React.RefObject<HTMLDivElement>, () => handleClose());


//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     onCardClose(index);
//   };

//   return (
//     <>
//       <AnimatePresence>
//         {open && (
//           <div className="fixed inset-0 h-screen z-50 overflow-auto">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
//             />
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               ref={containerRef}
//               layoutId={layout ? `card-${card.title}` : undefined}
//               className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
//             >
//               <button
//                 className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
//                 onClick={handleClose}
//               >
//                 <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
//               </button>
//               <motion.p
//                 layoutId={layout ? `category-${card.title}` : undefined}
//                 className="text-base font-medium text-black dark:text-white"
//               >
//                 {card.category}
//               </motion.p>
//               <motion.p
//                 layoutId={layout ? `title-${card.title}` : undefined}
//                 className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
//               >
//                 {card.title}
//               </motion.p>
//               <div className="py-10">{card.content}</div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//       <motion.button
//         layoutId={layout ? `card-${card.title}` : undefined}
//         onClick={handleOpen}
//         className="relative rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start"
//       >
//         <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
//         <div className="relative z-40 p-8">
//           <motion.p
//             layoutId={layout ? `category-${card.category}` : undefined}
//             className="text-white text-sm md:text-base font-medium font-sans"
//           >
//             {card.category}
//           </motion.p>
//           <motion.p
//             layoutId={layout ? `title-${card.title}` : undefined}
//             className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
//           >
//             {card.title}
//           </motion.p>
//           {/* Explore Now Button */}
//           <div className="mt-4">
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//               onClick={handleOpen}
//             >
//               Explore Now
//             </button>
//           </div>
//         </div>
//         <BlurImage
//           src={card.src}
//           alt={card.title}
//           fill
//           className="object-cover absolute inset-0"
//         />
//       </motion.button>
//     </>
//   );
// };

// // -----------------------
// // BlurImage Component
// // -----------------------

// export const BlurImage = ({
//   height,
//   width,
//   src,
//   className,
//   alt,
//   ...rest
// }: ImageProps) => {
//   const [isLoading, setLoading] = useState(true);
//   return (
//     <Image
//       className={cn("transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
//       onLoad={() => setLoading(false)}
//       src={src}
//       width={width}
//       height={height}
//       loading="lazy"
//       decoding="async"
//       blurDataURL={typeof src === "string" ? src : undefined}
//       alt={alt || "Background image"}
//       {...rest}
//     />
//   );
// };

// // -----------------------
// // DummyContent Component with Unique Messages
// // -----------------------

// const DummyContent = ({ index }: { index: number }) => {
//   const messages = [
//     "Discover how AI transforms industries.",
//     "Boost your productivity with smart solutions.",
//     "Experience the future with Apple Vision Pro.",
//     "Navigate with precision on your iPhone 15 Pro Max.",
//     "Capture stunning photos with our new features.",
//     "Join our team as a Staff Software Engineer.",
//     "Explore new opportunities with our hiring drive.",
//   ];

//   return (
//     <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
//       <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
//         {messages[index] || "Discover more exciting features!"}
//       </p>
//       <Image
//         src="/"
//         alt="Feature illustration"
//         height={500}
//         width={500}
//         className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
//       />
//     </div>
//   );
// };

// // -----------------------
// // Data Array
// // -----------------------

// const data: CardType[] = [
//   {
//     category: "Artificial Intelligence",
//     title: "You can do more with AI.",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={0} />,
//   },
//   {
//     category: "Productivity",
//     title: "Enhance your productivity.",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={1} />,
//   },
//   {
//     category: "Product",
//     title: "Launching the new Apple Vision Pro.",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={2} />,
//   },
//   {
//     category: "Product",
//     title: "Maps for your iPhone 15 Pro Max.",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={3} />,
//   },
//   {
//     category: "iOS",
//     title: "Photography just got better.",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={4} />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={5} />,
//   },
//   {
//     category: "Hiring",
//     title: "Hiring for a Staff Software Engineer",
//     src: "/LEARNIQAI.png",
//     content: <DummyContent index={6} />,
//   },
// ];

// // -----------------------
// // Main Demo Component
// // -----------------------

// export function AppleCardsCarouselDemo() {
//   const cards = data.map((card, index) => (
//     <Card key={card.src + index} card={card} index={index} />
//   ));

//   return (
//     <div className="w-full h-full py-20">
//       <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
//         Features That Drive Success – See What’s Inside!
//       </h2>
//       <Carousel items={cards} />
//     </div>
//   );
// }
