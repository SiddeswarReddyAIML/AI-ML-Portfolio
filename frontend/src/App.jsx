function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold text-cyan-400">
            AI/ML Portfolio
          </h1>

          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#about" className="hover:text-cyan-400">
              About
            </a>
            <a href="#projects" className="hover:text-cyan-400">
              Projects
            </a>
            <a href="#skills" className="hover:text-cyan-400">
              Skills
            </a>
            <a href="#contact" className="hover:text-cyan-400">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="mx-auto flex min-h-[80vh] max-w-6xl items-center px-6 py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              AI / Machine Learning
            </p>

            <h2 className="text-5xl font-bold leading-tight md:text-7xl">
              Building intelligent solutions with{" "}
              <span className="text-cyan-400">AI & ML.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Welcome to my portfolio. Explore my machine learning projects,
              technical skills, experiments, and journey in artificial
              intelligence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Contact Me
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-slate-800 bg-slate-900/40 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              About
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Turning data into intelligent solutions.
            </h2>

            <p className="mt-6 max-w-3xl leading-8 text-slate-400">
              I am passionate about artificial intelligence, machine learning,
              data science, and building practical applications that solve
              real-world problems.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Projects
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Featured AI/ML Projects
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Machine Learning Project",
                  description:
                    "A predictive machine learning application built with real-world data.",
                },
                {
                  title: "Computer Vision",
                  description:
                    "An AI application that analyzes and understands visual information.",
                },
                {
                  title: "NLP Application",
                  description:
                    "A natural language processing project for working with human language.",
                },
              ].map((project) => (
                <article
                  key={project.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500"
                >
                  <h3 className="text-xl font-bold">{project.title}</h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {project.description}
                  </p>

                  <button className="mt-6 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                    View Project →
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="border-t border-slate-800 bg-slate-900/40 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Skills
            </p>

            <h2 className="mt-3 text-3xl font-bold">Technical Skills</h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Python",
                "Machine Learning",
                "Deep Learning",
                "TensorFlow",
                "PyTorch",
                "Scikit-learn",
                "Pandas",
                "NumPy",
                "SQL",
                "React",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Contact
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Let's build something intelligent.
            </h2>

            <p className="mt-6 text-slate-400">
              Interested in collaborating or discussing an AI/ML project?
              Get in touch.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 AI/ML Portfolio. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
