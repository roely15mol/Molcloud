import React, { useState, useEffect } from 'react';

const asciiArt = `
██████╗  ██████╗ ███████╗██╗      ██████╗ ███████╗
██╔══██╗██╔═══██╗██╔════╝██║     ██╔═══██╗██╔════╝
██████╔╝██║   ██║█████╗  ██║     ██║   ██║███████╗
██╔══██╗██║   ██║██╔══╝  ██║     ██║   ██║╚════██║
██║  ██║╚██████╔╝███████╗███████╗╚██████╔╝███████║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚══════╝
                                                  
███╗   ███╗ ██████╗ ██╗     
████╗ ████║██╔═══██╗██║     
██╔████╔██║██║   ██║██║     
██║╚██╔╝██║██║   ██║██║     
██║ ╚═╝ ██║╚██████╔╝███████╗
╚═╝     ╚═╝ ╚═════╝ ╚══════╝
`;

const bootSequence = [
  'Booting MolOS v1.3.37...',
  'Connecting to neural interface...',
  'Calibrating reality matrix...',
  'Loading portfolio modules...',
  'All systems nominal.',
  'Welcome.',
];

interface WelcomeProps {
  onFinished: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onFinished }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < bootSequence.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, Math.random() * 250 + 80);
      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onFinished();
      }, 1000); 
      return () => clearTimeout(finalTimer);
    }
  }, [step, onFinished]);

  const displayedText = bootSequence.slice(0, step).join('\n');

  return (
    <div>
      <pre className="whitespace-pre-wrap">{displayedText}</pre>
      {step >= bootSequence.length && (
        <pre className="text-teal-400">{asciiArt}</pre>
      )}
    </div>
  );
};

export default Welcome;