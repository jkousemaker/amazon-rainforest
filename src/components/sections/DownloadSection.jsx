import { Magnetic } from "../core/magnetic";
import ShimmerButton from "../magicui/shimmer-button";

export default function DownloadSection() {
  return (
    <section id="download-section" className="flex flex-col w-full relative z-50 py-20 pb-30 bg-[#283e01] gap-10 justify-center items-center">
      <h3 className="text-5xl font-light tracking-normal text-white">
        Explore our Interactive Experience
      </h3>
      <Magnetic range={200} actionArea="parent">
        <ShimmerButton
          className="text-2xl px-20 bg-[#915A08] text-white uppercase"
          background="#915A08"
        >
          Download
        </ShimmerButton>
      </Magnetic>
    </section>
  );
}
