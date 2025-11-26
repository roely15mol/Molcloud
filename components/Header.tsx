import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu on click

    // Special case for the main "Roelof Mol" link to scroll to the top
    if (targetId === '#/gui') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#/gui');
      return;
    }
    
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Manually update the URL without triggering the hashchange event
      const newUrl = `#/gui${targetId}`;
      window.history.pushState(null, '', newUrl);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0D1117]/80 backdrop-blur-lg border-b border-gray-700/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a 
                href="#/gui" 
                className="text-2xl font-bold text-white hover:text-teal-400 transition-colors"
                onClick={(e) => handleNavClick(e, '#/gui')}
              >
                Roelof Mol<span className="text-teal-400">.</span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={`#/gui${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-300 hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                 <a
                    href="#/"
                    className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all"
                  >
                    Terminal
                  </a>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#0D1117]/95 backdrop-blur-lg"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
            aria-label="Close menu"
          >
            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center space-y-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={`#/gui${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-300 hover:text-teal-400 text-2xl font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#/"
              className="mt-4 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white px-5 py-3 rounded-md text-xl font-medium transition-all"
            >
              Terminal
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
