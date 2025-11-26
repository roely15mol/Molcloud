import React, { useEffect } from 'react';
import Section from './Section';
import { CERTIFICATIONS } from '../constants';

const Certifications = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      const credlyScript = document.querySelector('script[src="https://cdn.credly.com/assets/utilities/embed.js"]');
      if (credlyScript) {
        document.body.removeChild(credlyScript);
      }
    };
  }, []);

  return (
    <Section id="certifications" title="Certifications">
      <div className="flex flex-wrap justify-center items-center gap-8">
        {CERTIFICATIONS.map(cert => (
           <div 
             key={cert.badgeId}
             data-iframe-width="150" 
             data-iframe-height="270" 
             data-share-badge-id={cert.badgeId}
             data-share-badge-host="https://www.credly.com"
           ></div>
        ))}
      </div>
    </Section>
  );
};

export default Certifications;