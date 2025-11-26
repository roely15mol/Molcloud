import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Projects from './components/Projects';

const GuiApp = () => {
  return (
    <div className="bg-[#0D1117] text-gray-300 antialiased">
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Hero />
                <About />
                <Skills />
                <Experience />
                {/* FIX: Render the Projects component to display the new section. */}
                <Projects />
                <Education />
                <Certifications />
                <Contact />
            </main>
            <Footer />
        </div>
    </div>
  );
};

export default GuiApp;