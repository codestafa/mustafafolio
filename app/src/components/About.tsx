import me from '../assets/me.png';
import SpotifyNowPlaying from './Spotify/SpotifyNowPlaying';

function About() {
  return (
    <section id="about" className="bg-stone-50">
      {/* Section Title */}
      <div className="flex justify-center items-center py-8 bg-stone-50">
        <div className="flex flex-col lg:flex-row items-center max-w-5xl mx-auto space-y-4 lg:space-y-0 lg:space-x-6">
          {/* Image Section */}
          <img
              src={me}
              alt="Mustafa Ali"
              className="h-auto w-full max-w-xs rounded-lg"
              loading="lazy"
            />
          {/* Spotify Now Playing Section */}
          <SpotifyNowPlaying />
        </div>
      </div>

      {/* Text Section */}
      <div className="max-w-5xl mx-auto p-4">
        <p className="text-base text-gray-700 mb-3 text-center lg:text-left">
          Hello! I'm <strong>Mustafa Ali</strong>, a Computer Science student at Chico State University. I specialize in full-stack development and have experience in DevSecOps. I chose Computer Science because I love coming up with new ideas and building them. I plan to gain experience with mobile development next, specifically iOS.
        </p>
        <p className="text-base text-gray-700 text-center lg:text-left">
          I graduate in December 2025 and I'm searching for <strong>Software Engineering Internships</strong> for Summer 2025.
        </p>
      </div>
    </section>
  );
}

export default About;

