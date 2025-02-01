"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `

LearniQAI redefines education by merging the power of AI with your unique learning journey. Its not just about learning smarter, but about learning faster, more efficiently, and with purpose. Prepare for tomorrows challenges today, with a personalized, AI-driven platform that empowers you to excel in both knowledge and career.

How does this sound? Ready to make an impact?`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
