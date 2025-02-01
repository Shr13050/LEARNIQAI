import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Your personalized learning companion powered by cutting-edge AI. Start your journey to smarter learning and career success",
      name: "Welcome to LearniQAI!",
      designation: "Get Started",
      src: "/LEARNIQAI.png",
    },
    {
      quote:
        "AI-driven tools, tailored learning, and career-ready features, all in one place. Its easy to get started and watch your skills grow!",
      name: "How LearniQAI Works",
      designation: "Learn More",
      src: "/aiflowchart.png",
    },
    {
      quote:
        "LearniQAI brings together advanced AI, personalized learning paths, and career development—all designed to help you thrive..",
      name: "Why Choose LearniQAI?",
      designation: "Discover the Benefits",
      src: "/balance.png",
    },
    {
      quote:
        "Gain deeper insights into your learning progress. AI helps track your performance and suggests ways to improve",
      name: "View Insights",
      designation: "AI Learning Insights",
      src: "/stats.png",
    },
    {
      quote:
        "We're constantly improving. Stay tuned for exciting new features and enhancements to help you learn and grow even better.",
      name: "Coming Soon",
      designation: "Coming Soon",
      src: "/rename.png",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
