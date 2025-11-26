import React from 'react';

const Hero = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      const newUrl = `#/gui${targetId}`;
      window.history.pushState(null, '', newUrl);
    }
  };

  return (
    <div className="relative text-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#0D1117]"></div>
          <div 
              className="absolute inset-0 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 opacity-20 blur-3xl"
              style={{
                  animation: 'gradient-move 15s ease infinite',
              }}
          ></div>
          <style>{`
              @keyframes gradient-move {
                  0% { transform: translate(0px, 0px) scale(1); }
                  25% { transform: translate(20px, -20px) scale(1.1); }
                  50% { transform: translate(-20px, 20px) scale(0.9); }
                  75% { transform: translate(-20px, -20px) scale(1.1); }
                  100% { transform: translate(0px, 0px) scale(1); }
              }
          `}</style>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 sm:pt-48 sm:pb-40">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
          Roelof Mol
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
          Customer Cloud Engineer | Private Cloud, Automation & DevOps Specialist
        </p>
        <div className="mt-10 flex justify-center">
          <a
            href="#/gui#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="inline-block bg-teal-500 text-white font-semibold px-8 py-4 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
