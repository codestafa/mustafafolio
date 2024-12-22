import React from 'react';

import elemint from '../assets/elemint.jpg';
import wisk from '../assets/wisk.jpg';
import fantic from '../assets/fantic.jpg';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string[];
  logo: string; // Add logo property
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer, DevSecOps (Contract)",
    company: "Wisk Aero (Boeing)",
    duration: "Sep 2024 - Dec 2024",
    logo: wisk,
    description: [
      "Streamlined and optimized Google Cloud shared disk storage for simulations using Go, significantly enhancing availability and performance.",
      "Enhanced the Visual Studio Code extension by implementing new features, improving efficiency in requirements tracing and developer workflows.",
      "Expanded and refined CI/CD pipelines across multiple teams, ensuring seamless integration and deployment processes."
    ]
  },
  {
    title: "Software Engineer Intern, DevSecOps",
    company: "Wisk Aero (Boeing)",
    duration: "Jun 2024 - Aug 2024",
    logo: wisk,
    description: [
      "Developed a Visual Studio Code extension for multiple Boeing and Wisk teams, generating unique IDs for requirements, improving traceability and reducing manual errors by 30.",
      "Integrated Static Analysis tools (Coverity and SonarQube) into GitLab pipelines, enhancing code quality and detecting vulnerabilities early, leading to a 25\% reduction in security flaws.",
      "Designed and implemented a Docker container for the Static Analysis process, streamlining development workflows and reducing build times by 20%."
    ],
  },
  {
    title: "Software Engineer, Frontend (Contract)",
    company: "Fantic",
    duration: "Feb 2024 - May 2024",
    logo: fantic,
    description: [
      "Refactored JavaScript codebase, enhancing readability and maintainability, and quickly became proficient in navigating and understanding the complex code.",
      "Transformed frontend interfaces by implementing design team's specifications using vanilla CSS and JavaScript, ensuring seamless integration of new designs while maintaining consistent user experience and visual appeal across the platform.",
      "Developed and maintained unit tests during the refactoring process to ensure functionality was preserved and regressions were avoided.",
    ],
  },
  {
    title: "Software Engineer Intern, Fullstack",
    company: "Elemint",
    duration: "Aug 2023 - Nov 2023",
    logo: elemint,
    description: [
      "Optimized user session management by transitioning from PostgreSQL database storage to a Redis session store, collaborating with the DevOps team to test the changes in a cloud environment.",
      "Collaborated with cross-functional teams to ensure proper user experience through the utilization of Tailwind, Storybook, Tw-Merge, and CVA for a Next.js-based project, following up on requirements and design.",
      "Designed and developed a RESTful API for a new feature using TSOA, integrated it with a PostgreSQL database, and tested the endpoints using Postman.",
      "Participated in daily standups, conducted code reviews, and engaged in pair programming with other engineers to discuss and resolve blockers."
    ],
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="bg-stone-50 p-5">
      <h1 className="text-4xl font-bold text-indigo-600 mb-8 text-center">Experience</h1>
      <div className="max-w-5xl mx-auto space-y-6">
        {experiences.map((experience, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-4 flex space-x-4 items-start">
            {/* Logo */}
            <img
              src={experience.logo}
              alt={`${experience.company} logo`}
              className="w-14 h-14 object-cover rounded-md shadow"
            />

            {/* Experience Details */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800">{experience.title}</h2>
              <h2 className="text-md font-bold text-gray-600">{experience.company}</h2>
              <h2 className="text-sm text-gray-500">{experience.duration}</h2>

              <div className="flex justify-between items-center text-sm text-gray-600">
              </div>
              <ul className="mt-2 list-disc list-outside text-sm text-gray-700 leading-tight text-left">
                {experience.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
