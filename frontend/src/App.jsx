function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-xl font-bold text-cyan-400">
            Boreddygari Siddeswar Reddy
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
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              AI / Machine Learning
            </p>

            <h2 className="text-5xl font-bold leading-tight md:text-7xl">
              Building intelligent solutions with{" "}
              <span className="text-cyan-400">AI & ML.</span>
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              I am an AI/ML professional passionate about machine learning,
              data science, generative AI, and building practical solutions
              for real-world problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {/* View Projects */}
              <a
                href="#projects"
                className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                View Projects
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/SiddeswarReddyAIML"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                GitHub
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/boreddygarisiddeswarreddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                LinkedIn
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
              About Me
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              From data to intelligent solutions.
            </h2>

            <p className="mt-6 max-w-3xl leading-8 text-slate-400">
              I am an AI/ML professional with a strong interest in machine
              learning, data science, artificial intelligence, and building
              practical solutions for real-world problems.
            </p>

            <p className="mt-4 max-w-3xl leading-8 text-slate-400">
              My technical interests include machine learning, deep learning,
              natural language processing, generative AI, retrieval-augmented
              generation, and MLOps. I enjoy taking problems from data
              exploration and model development through to practical
              applications.
            </p>

            <p className="mt-4 max-w-3xl leading-8 text-slate-400">
              This portfolio documents my projects, experiments, technical
              learning journey, and progression toward building production-ready
              AI and machine learning systems.
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
              AI/ML Project Journey
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-slate-400">
              A progression from foundational data analysis and machine
              learning to generative AI and production MLOps systems.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Credit Card Transaction Analysis & Fraud Detection",
                  category: "Project 01 • FinTech / Machine Learning",
                  description:
                    "An end-to-end exploratory data analysis and baseline fraud detection project using 10,000 synthetic credit card transactions. Includes data quality analysis, feature engineering, Logistic Regression, threshold analysis, ROC-AUC, Precision-Recall analysis, and model persistence.",
                  technologies:
                    "Python • Pandas • NumPy • Scikit-learn • Matplotlib • Seaborn • Jupyter",
                  result:
                    "ROC-AUC: 0.9944 • Accuracy: 99.30% • Fraud Recall: 73.33% at 0.30 threshold",
                  github:
                    "https://github.com/SiddeswarReddyAIML/AI-ML-Portfolio/tree/main/projects/01-python-data-analysis",
                  status: "Completed",
                },
                {
                  title: "Online Retail Data Cleaning & Exploratory Data Analysis",
                  category: "Project 02 • Data Analysis / EDA",
                  description:
                    "An end-to-end data cleaning and exploratory analysis project using 541,909 transaction records from the UCI Online Retail dataset. Investigates missing values, duplicates, returns, pricing anomalies, sales trends, product performance, geographic concentration, and customer behavior.",
                  technologies:
                    "Python • Pandas • NumPy • Matplotlib • Seaborn • Jupyter • Excel",
                  result:
                    "536,639 cleaned rows • 4,372 identifiable customers • UK: 84.01% of transaction value • Top 10% customers: 60.10% of identifiable value",
                  github:
                    "https://github.com/SiddeswarReddyAIML/AI-ML-Portfolio/tree/main/projects/02-data-cleaning-eda",
                  status: "Completed",
                },
                {
                  title: "House Price Prediction",
                  category: "Project 03 • Machine Learning",
                  description:
                    "A supervised learning project covering data preprocessing, exploratory analysis, feature engineering, model training, and evaluation.",
                  technologies:
                    "Python • Pandas • Scikit-learn",
                  result:
                    "Planned machine learning regression project",
                  github: null,
                  status: "Coming soon",
                },
                {
                  title: "RAG Document Assistant",
                  category: "Project 08 • Generative AI",
                  description:
                    "A retrieval-augmented generation application designed to answer questions using information from uploaded documents.",
                  technologies:
                    "Python • LLMs • Embeddings • Vector Database • RAG",
                  result:
                    "Planned generative AI project",
                  github: null,
                  status: "Coming soon",
                },
              ].map((project) => (
                <article
                  key={project.title}
                  className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500"
                >
                  <p className="text-sm font-semibold text-cyan-400">
                    {project.category}
                  </p>

                  <h3 className="mt-3 text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {project.description}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    <span className="font-semibold text-slate-300">
                      Technologies:
                    </span>{" "}
                    {project.technologies}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    <span className="font-semibold text-slate-300">
                      Result:
                    </span>{" "}
                    {project.result}
                  </p>

                  <div className="mt-auto pt-6">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                      >
                        View Project on GitHub →
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-slate-500">
                        {project.status} →
                      </span>
                    )}
                  </div>
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

            <h2 className="mt-3 text-3xl font-bold">
              Technical Skills
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Python",
                "SQL",
                "Pandas",
                "NumPy",
                "Scikit-learn",
                "Machine Learning",
                "Deep Learning",
                "TensorFlow",
                "PyTorch",
                "NLP",
                "Generative AI",
                "RAG",
                "FastAPI",
                "React",
                "Git",
                "GitHub",
                "Docker",
                "MLOps",
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
        <section
          id="contact"
          className="border-t border-slate-800 px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Contact
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Let's build something intelligent.
            </h2>

            <p className="mt-6 max-w-2xl leading-7 text-slate-400">
              Interested in AI/ML, data science, generative AI, or intelligent
              applications? Feel free to connect with me.
            </p>

            {/* Contact Information */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {/* Email */}
              <a
                href="mailto:siddeswarreddyboreddygari@gmail.com"
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500"
              >
                <p className="text-sm text-slate-500">Email</p>

                <p className="mt-2 break-all font-medium text-cyan-400">
                  siddeswarreddyboreddygari@gmail.com
                </p>
              </a>

              {/* Phone */}
              <a
                href="tel:+919390586429"
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500"
              >
                <p className="text-sm text-slate-500">Phone</p>

                <p className="mt-2 font-medium text-cyan-400">
                  +91 93905 86429
                </p>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/boreddygarisiddeswarreddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500"
              >
                <p className="text-sm text-slate-500">LinkedIn</p>

                <p className="mt-2 font-medium text-cyan-400">
                  Connect on LinkedIn →
                </p>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://github.com/SiddeswarReddyAIML"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                GitHub →
              </a>

              <a
                href="https://www.linkedin.com/in/boreddygarisiddeswarreddy/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
              >
                LinkedIn →
              </a>

              <a
                href="mailto:siddeswarreddyboreddygari@gmail.com"
                className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Email Me →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 Boreddygari Siddeswar Reddy. All rights reserved.
      </footer>
    </div>
  );
}

export default App;