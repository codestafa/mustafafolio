import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1  p-4 rounded-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Contact Me
      </h2>
      <p className="text-gray-600 text-center">
        I'm always open to connecting! Feel free to reach out via:
      </p>
      <ul className="space-y-4 w-full">
        <li>
          <a
            href="mailto:cs.mustafaali@gmail.com"
            className="flex items-center justify-center text-indigo-600 hover:underline"
          >
            📧 <span className="ml-2">cs.mustafaali@gmail.com</span>
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/codestafa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-indigo-600 hover:underline"
          >
            💼 <span className="ml-2">LinkedIn</span>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/codestafa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-indigo-600 hover:underline"
          >
            🐙 <span className="ml-2">GitHub</span>
          </a>
        </li>
      </ul>
      <a
        href="https://linkedin.com/in/codestafa"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition"
      >
        Connect with me
      </a>
    </div>
  );
};

export default Contact;
