"use client";

import Paragraph from "../scroll-opacity/Character";
export default function SloganSection() {
  return (
    <section className="h-screen relative z-20 bg-white grid place-items-center  text-black">
      <Paragraph
        paragraph={
          "Enter the world of the Amazon, the largest rainforest in the planet and one of the most biodeverse places on earth. In the Amazon Rainforest you can freely explore and learn about the most amazing species that live in its ecosystem."
        }
      />
    </section>
  );
}
