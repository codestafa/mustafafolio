// src/App.tsx
import Navbar from './components/Navbar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Skills from './components/Skills';
import './App.css';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main className="mt-12">
        {/* Main Content */}
        <div className="lg:p-4 border border-solid border-stone-200 shadow-md rounded-lg">
          <About />
          <Experience />
          <Projects />
          <Education />
          <Skills />
          <footer className="xl:hidden bg-stone-100 p-4 border-stone-200 shadow-lg">
           < Contact />
          </footer>
        </div>
      </main>
    </>
  );
}

export default App;
