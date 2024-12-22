import React from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  learned: string;
  githubLink?: string;
  liveDemoLink?: string;
}

const projects: Project[] = [
  {
    title: "SoundCircle",
    description:
      "A dynamic platform designed to connect musicians, producers, and music enthusiasts from around the world.",
    technologies: ["TypeScript", "React.js", "Node.js", "Tailwind CSS", "PostgresSQL"],
    learned:
      "This project allowed me to take on a leadership role, leveraging my experience to set up and configure the project infrastructure. I mentored teammates with little to no prior experience, fostering collaboration and technical growth within the team.",
    githubLink: "https://github.com/ChicoState/SoundCircle",
  },
  {
    title: "MoodBased",
    description:
      "An interactive dashboard for analyzing Spotify playlists by mood and other metrics, using the Spotify API.",
    technologies: ["TypeScript", "React.js", "Node.js", "Express.js", "AWS EC2", "Material UI"],
    learned:
      "I deepened my understanding of working with APIs and securely handling user data. This project taught me to design a secure web application, safeguard sensitive information, and implement best practices for cookie storage and data protection.",
    githubLink: "https://github.com/codestafa/MoodBased",
  },
  {
    title: "WellnessTracker",
    description:
      "With its intuitive interface and comprehensive tracking features, users can monitor their habits and progress over time.",
    technologies: ["JavaScript", "Express", "Node", "MongoDB", "HTML", "CSS"],
    learned:
      "This project laid the foundation for my web development skills. By working with plain JavaScript, HTML, CSS, and MongoDB, I gained a solid understanding of the DOM, the box model, and backend integration.",
    githubLink: "https://github.com/codestafa/Wellness-Tracker",
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="bg-stone-50 p-5">
      <h1 className="text-4xl font-bold text-indigo-600 mb-12 text-center">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <ul className="mt-4 list-disc list-inside text-gray-700">
                {project.technologies.map((tech, idx) => (
                  <li key={idx} className="text-sm">{tech}</li>
                ))}
              </ul>
              <p className="mt-4 text-gray-700 text-sm">
                <strong>What I Learned:</strong> {project.learned}
              </p>
            </div>
            <div className="mt-4 flex space-x-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm"
                >
                  GitHub
                </a>
              )}
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
