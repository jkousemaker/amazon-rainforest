import Logo from "../Logo";

export default function AboutSection() {
  return (
    <section className="flex flex-col items-start justify-center p-4 md:p-10">
      <div className="flex flex-row items-end mb-14">
        <div className="h-32 w-32">
          <Logo />
        </div>

        <h1 className="text-4xl ml-5">Amazon Rainforest</h1>
      </div>
      <div className="max-w-3xl mb-10">
        <p className="text-3xl leading-10">
          An immersive and interactive experience. Built for educators, students
          and anyone passionate about nature and its wonders.
        </p>
      </div>
      <div className="max-w-4xl">
        <p className="text-3xl leading-10 ">
          Amazon Rainforest was born from the purpose of bringing the beauty and
          diversity of the world´s largest tropical florest, offering an unique
          experience, where users can explore and have an interactive learning
          experience.
        </p>
      </div>
    </section>
  );
}
