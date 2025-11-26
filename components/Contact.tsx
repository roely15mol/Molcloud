import React from 'react';
import Section from './Section';

const Contact = () => {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of an amazing team. Feel free to reach out.
        </p>
        <a 
          href="mailto:roelof@molcloud.net"
          className="inline-block bg-teal-500 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20 text-base sm:text-lg"
        >
          Say Hello
        </a>
      </div>
    </Section>
  );
};

export default Contact;
