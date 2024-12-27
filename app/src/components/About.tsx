// src/components/About.tsx

import SpotifyNowPlaying from './Spotify/SpotifyNowPlaying';

function About() {
  const imageUrl = "https://res.cloudinary.com/djtegdhqw/image/upload/v1734884608/659db454-d991-453b-a294-ca8d3c96bbf5.png";

  return (
    <section id="about" className="bg-stone-50 md:px-5">
      {/* Image and Spotify Section */}
      <div className="flex flex-col lg:flex-row items-center max-w-5xl mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Image Section */}
        <img
          src={imageUrl}
          alt="Portrait of Mustafa Ali"
          className="h-auto w-full max-w-lg rounded-lg shadow-lg"
          loading="lazy"
        />
        {/* Spotify Now Playing Section */}
        <SpotifyNowPlaying />
      </div>

      {/* Text Section */}
      <div className="flex flex-col max-w-5xl mx-auto mt-6 px-4 lg:px-0">
  <p className="text-base text-gray-700 mb-3 text-center lg:text-left">
    Hi, I'm <strong>Mustafa Ali</strong>, a Computer Science student at Chico State with experience in full-stack development and DevSecOps. I'm Graduating in December 2025 and I'm looking for <strong>Software Engineering Internships</strong> for Summer 2025.
  </p>
</div>


    </section>
  );
}

export default About;
