'use client'

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { LampDemo } from "@/components/ui/lamp";
import { Vortex } from "@/components/ui/vortex";
import { SparklesCore } from "@/components/ui/sparkles";
import { SparklesPreview } from "@/components/sparkles";
import { TextGenerateEffectDemo } from "@/components/TextGenerateeffect";
import { HeroScrollDemo } from "@/components/containerscroll";
import { AnimatedTestimonialsDemo } from "@/components/animatedtestimonials";
import { TimelineDemo } from "@/components/timline";
import { ThreeDCardDemo } from "@/components/threedcard";
import { FlipWordsDemo } from "@/components/flipwords";
import { WavyBackgroundDemo } from "@/components/wavyback";

export default function Home() {

  const {user}=useUser();
  const createUser=useMutation(api.user.createUser)

  useEffect(()=>{
    user && CheckUser();
  },[user])

  const CheckUser =async()=>{
    const result=await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imgUrl:user?.imageUrl,
      userName:user?.fullName
    })

  }

  return (
  <div>
    
    {/* <LampDemo/>
    <Vortex/> */}
    {/* <TextGenerateEffectDemo/> */}
    <SparklesPreview/>
    <AnimatedTestimonialsDemo/>
    <HeroScrollDemo/>
    <TimelineDemo/>
    {/* <WavyBackgroundDemo/> */}
    {/* <ThreeDCardDemo/> */}
    <FlipWordsDemo/>
    

    
   
  </div>
  );
}


// "use client";

// import { Button } from "@/components/ui/button";
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useEffect, useState } from "react";
// import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect"; // Import the new component
// import { motion, useAnimation } from "framer-motion";
// import { LampDemo } from "@/components/ui/lamp";

// export default function Home() {
//   const { user } = useUser();
//   const createUser = useMutation(api.user.createUser);
//   const [pathLengths, setPathLengths] = useState([0, 0, 0, 0, 0]);

//   const controlAnimation = useAnimation();

//   useEffect(() => {
//     if (user) {
//       CheckUser();
//     }
//   }, [user]);

//   const CheckUser = async () => {
//     if (user) {
//       const result = await createUser({
//         email: user?.primaryEmailAddress?.emailAddress,
//         imgUrl: user?.imageUrl,
//         userName: user?.fullName,
//       });
//     }
//   };

//   // Start animating the path lengths after the component mounts
//   useEffect(() => {
//     // Trigger animation when component mounts
//     setPathLengths([1, 1, 1, 1, 1]);

//     // You can use controlAnimation to start specific animations
//     controlAnimation.start({
//       opacity: 1,
//       transition: { duration: 2 },
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Hey there, I'm Shreya</h2>
//       <Button>Click me</Button>

//       {/* Using framer-motion to animate the GoogleGeminiEffect component */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={controlAnimation} // Control animation with framer-motion's `useAnimation`
//         transition={{ duration: 2 }}
//       >
//         <GoogleGeminiEffect
//           pathLengths={pathLengths} // Pass pathLengths to control animation
//           title="Welcome to My Page!"
//           description="This is an interactive component powered by Aceternity UI."
//         />
//       </motion.div>
      
//       <UserButton />
//     </div>
//   );
// }
