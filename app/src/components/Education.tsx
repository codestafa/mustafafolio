import React from "react";

interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  gpa: string;
  favoriteClasses: string[];
}

const education: EducationItem[] = [
  {
    institution: "California State University, Chico",
    degree: "Bachelor of Science in Computer Science",
    duration: "Expected Graduation: December 2025",
    gpa: "3.91",
    favoriteClasses: [
      "Advanced Algorithms",
      "Linear Algebra for Computer Science",
      "Applied Quantum Computing",
      "Software Engineering",
      "Computer Networks",
      "Cybersecurity",
      "Databases",
    ],
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="bg-stone-50 p-5">
      <h1 className="text-4xl font-bold text-indigo-600 mb-12 text-center">
        Education
      </h1>
      <div className="max-w-5xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">{edu.institution}</h2>
            <p className="text-gray-600 italic">{edu.degree}</p>
            <p className="text-gray-500 text-sm">{edu.duration}</p>
            <p className="text-gray-700 mt-4">
              <span className="font-bold">GPA:</span> {edu.gpa}
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Favorite Classes:
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {edu.favoriteClasses.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
