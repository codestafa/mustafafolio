import React from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  logo: string; // Add logo property
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer (Contract)",
    company: "Wisk Aero (Boeing)",
    duration: "Sep 2024 - Dec 2024",
    logo: "https://res.cloudinary.com/djtegdhqw/image/upload/v1734882078/wisk_semnsj.jpg",
  },
  {
    title: "Software Engineer Intern",
    company: "Wisk Aero (Boeing)",
    duration: "Jun 2024 - Aug 2024",
    logo: "https://res.cloudinary.com/djtegdhqw/image/upload/v1734882078/wisk_semnsj.jpg",
  },
  {
    title: "Software Engineer (Contract)",
    company: "Fantic",
    duration: "Feb 2024 - May 2024",
    logo: "https://res.cloudinary.com/djtegdhqw/image/upload/v1734882078/fantic_p9xqnw.jpg",
  },
  {
    title: "Software Engineer Intern",
    company: "Elemint",
    duration: "Aug 2023 - Nov 2023",
    logo: "https://res.cloudinary.com/djtegdhqw/image/upload/v1734882078/elemint_gnc6eb.jpg",
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="bg-stone-50 py-10 px-5">
      <h1 className="text-4xl font-bold text-indigo-600 mb-12 text-center">Work Experience</h1>
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {/* Logo */}
            <div className="p-4 flex justify-center items-center bg-gray-100">
              <img
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="w-16 h-16 object-contain"
              />
            </div>

            {/* Experience Details */}
            <div className="p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-1">{experience.title}</h2>
              <h3 className="text-md font-semibold text-gray-600">{experience.company}</h3>
              <p className="text-sm text-gray-500">{experience.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
