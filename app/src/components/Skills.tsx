import React from "react";

const skills = [
  "TypeScript",
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
  "OAuth",
  "Tailwind CSS",
  "Material UI",
  "CI/CD",
  "RESTful APIs"
];

const contributions = [
  {
    project: "RuneLite",
    description:
      "Resolved an issue in the Grand Exchange plugin to display average item prices. Learned Java in the process.",
    link: "https://github.com/runelite",
  },
  {
    project: "Neume Network",
    description:
      "Contributed to an open source, credibly neutral, socially scalable, indexer for the future onchain music ecosystem.",
    link: "https://github.com/neume-network",
  },
  {
    project: "OSS Insight",
    description:
      "Collaborated on insights and analytics for open-source repositories.",
    link: "https://github.com/pingcap/ossinsight",
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="bg-stone-50 p-4">
      <h1 className="text-4xl font-bold text-indigo-600 mb-12 text-center">
        Skills & Contributions
      </h1>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 text-center hover:shadow-md transition duration-300"
          >
            <p className="text-lg font-medium text-gray-800">{skill}</p>
          </div>
        ))}
      </div>
      <div className="max-w-5xl mx-auto space-y-4">
        {contributions.map((contribution, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition duration-300"
          >
            <h3 className="text-xl font-bold text-gray-800">{contribution.project}</h3>
            <p className="text-gray-600 mt-2">{contribution.description}</p>
            <a
              href={contribution.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline mt-2 block"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
