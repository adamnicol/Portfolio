import image from "@assets/logo.jpg";

export function About() {
  return (
    <article>
      <h1>About</h1>
      <div className="callout">
        <img src={image} className="about-image" alt="photo" />
        <p>
          I'm a software developer with a passion for writing code, solving
          problems, and learning new things. I enjoy the fast paced and
          constantly evolving nature of software and the challenges that come
          with it. I like building things and seeing them come together, and
          solving real-world problems with software.
        </p>
        <p>
          I have worked for over 15 years in the engineering industry, building
          software solutions for some of the largest energy, construction, and
          defense companies in the world. This has primarily been in the form of
          data-driven, reporting, and decision-making software for the Windows
          desktop, using C#, the Microsoft .NET Framework, and SQL databases.
        </p>
        <p>
          Currently I am focusing on web development with React and Node.js.
          This website was intended as a learning project to update my skills
          and learn modern frameworks and tools.
        </p>
        <p>
          I would describe myself as self-taught, although I also have an
          honours degree. In my spare time I like to keep my skills up to date
          and read about technology. I also enjoy gaming, running and going to
          the gym.
        </p>
      </div>
    </article>
  );
}
