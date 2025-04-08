"use client";
import React from "react";
import { HeroParallax } from "../components/ui/hero-parallax";

export function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "/balance.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "/aiflowchart.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "/cr2.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "/cr3.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "/cr4.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "/cr5.jpeg",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "/cr6.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "/cr7.avif",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "/cr8.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "/frontend_img.jpg",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "/interview.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "/logolearniqai.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "/cr10.jpg",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "/cr11.jpeg",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "/cr12.jpg",
  },
];
