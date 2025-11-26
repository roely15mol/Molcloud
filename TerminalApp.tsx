import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as Commands from './components/Commands';
import Welcome from './components/Welcome';

const CommandMapping: { [key: string]: React.FC<any> } = {
  help: Commands.Help,
  about: Commands.About,
  skills: Commands.Skills,
  experience: Commands.Experience,
  projects: Commands.Projects,
  education: Commands.Education,
  certifications: Commands.Certifications,
  social: Commands.Social,
  contact: Commands.Contact,
  whoami: Commands.Whoami,
};

const TerminalApp = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  const [showMatrix, setShowMatrix] = useState(false);
  const endOfTerminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const playBootTone = useCallback(() => {
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioCtx) {
      return;
    }
    const context = new AudioCtx();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.value = 420;
    gainNode.gain.setValueAtTime(0.2, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.2);

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 1.2);
    oscillator.addEventListener('ended', () => context.close());
  }, []);

  const handlePowerOnClick = () => {
    playBootTone();
    
    setIsZooming(true);

    setTimeout(() => {
      setIsPoweredOn(true);
    }, 1000); // Match animation duration
  };

  const handleBootFinished = useCallback(() => {
    setIsBooting(false);
  }, []);

  const handleExitMatrix = useCallback(() => {
    setShowMatrix(false);
  }, []);

  const processCommand = useCallback((fullCommand: string) => {
    const trimmedCommand = fullCommand.trim();
    const [command, ...args] = trimmedCommand.split(' ');
    // Make command case-insensitive and remove trailing punctuation
    const commandClean = command.toLowerCase().replace(/[.,!?;:]+$/, '');
    const restOfCommand = args.join(' ');

    if (commandClean === 'clear') {
      setHistory([]);
      return;
    }
    if (commandClean === 'gui') {
      setAwaitingConfirmation(true);
      setHistory(prev => [...prev, { command: trimmedCommand, output: <Commands.GuiConfirmation /> }]);
      return;
    }
    if (commandClean === 'matrix') {
      setShowMatrix(true);
      setHistory(prev => [...prev, { command: trimmedCommand, output: null }]);
      return;
    }
    if (commandClean === 'cowsay') {
      setHistory(prev => [...prev, { command: trimmedCommand, output: <Commands.Cowsay message={restOfCommand || 'Moooo!'} /> }]);
      return;
    }
     if (commandClean === 'all') {
      const allOutput = (
        <div>
          {Object.entries(CommandMapping).map(([cmd, Comp]) => (
            <div key={cmd} className="mb-4">
              <p className="text-teal-400">$ {cmd}</p>
              <Comp />
            </div>
          ))}
        </div>
      );
      setHistory(prev => [...prev, { command: trimmedCommand, output: allOutput }]);
      return;
    }

    const OutputComponent = CommandMapping[commandClean];
    const output = OutputComponent ? <OutputComponent /> : <Commands.NotFound command={command} />;
    setHistory(prev => [...prev, { command: trimmedCommand, output }]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();

      const commandToProcess = input.trim();
      setInput('');
      setHistoryIndex(-1); // Reset history index on new command

      if (commandToProcess) {
        setCommandHistory(prev => [commandToProcess, ...prev]);
      }

      if (awaitingConfirmation) {
        if (commandToProcess.toLowerCase() === 'y' || commandToProcess === '') {
           setHistory(prev => [...prev, { command: commandToProcess, output: 'Redirecting to GUI version...' }]);
           setTimeout(() => {
             window.location.hash = '#/gui';
           }, 1000);
        } else {
           setHistory(prev => [...prev, { command: commandToProcess, output: 'Aborted.' }]);
        }
        setAwaitingConfirmation(false);
        return;
      }
      
      if (commandToProcess) {
        processCommand(commandToProcess);
      } else {
        setHistory(prev => [...prev, { command: '', output: null }]);
      }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        } else {
            setHistoryIndex(-1);
            setInput('');
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const availableCommands = [...Object.keys(CommandMapping), 'clear', 'gui', 'matrix', 'all', 'cowsay'];
        const matchingCommands = availableCommands.filter(cmd => cmd.startsWith(input));
        if (matchingCommands.length === 1) {
            setInput(matchingCommands[0]);
        }
    }
  };

  useEffect(() => {
    if (isPoweredOn && !isBooting) {
        endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isPoweredOn, isBooting]);

  useEffect(() => {
    const handleClick = () => {
        if (isPoweredOn && !isBooting) {
            inputRef.current?.focus();
        }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isPoweredOn, isBooting]);

  if (showMatrix) {
    return <Commands.Matrix onExit={handleExitMatrix} />;
  }
  
  return (
    <div className="font-mono bg-black text-green-400 min-h-screen relative overflow-hidden">
      
      {/* Pre-Boot Screen Wrapper for centering the monitor */}
      <div 
        className={`w-full h-full flex flex-col items-center justify-center p-4 transition-all duration-1000 ease-in-out ${isZooming ? 'scale-[3] opacity-0' : 'scale-100 opacity-100'} ${isPoweredOn ? 'hidden' : ''}`}
        aria-hidden={isPoweredOn}
      >
        <div className="flex flex-col items-center">
          {/* Monitor Body */}
          <div className="bg-gray-300 p-2 sm:p-4 rounded-t-lg shadow-2xl border-t border-x border-gray-400 w-[90vw] max-w-4xl">
            {/* Screen Area */}
            <div className="bg-black w-full aspect-[16/10] rounded-md flex items-center justify-center text-center p-4 border-2 border-gray-900/50">
               <p className="text-gray-700 text-base sm:text-lg animate-pulse">PRESS POWER BUTTON TO BOOT</p>
            </div>
          </div>
          {/* Bottom part of the bezel with logo and button */}
          <div className="bg-gray-200 w-[90vw] max-w-4xl p-3 sm:p-4 flex justify-between items-center shadow-2xl border-x border-b border-gray-400">
              <div className="w-1/3"></div> {/* Left Spacer */}
              <div className="w-1/3 flex justify-center">
                  {/* Mole Logo */}
                  <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M8,11c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S8.6,11,8,11z M12,16c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,16,12,16z M16,11c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S16.6,11,16,11z"/>
                  </svg>
              </div>
              <div className="w-1/3 flex justify-end">
                  <button 
                      onClick={handlePowerOnClick}
                      className="text-gray-500 hover:text-gray-800 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200 rounded-full p-2"
                      aria-label="Power on terminal"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                      </svg>
                  </button>
              </div>
          </div>
          {/* Stand */}
          <div className="w-1/3 h-12 bg-gray-300 border-x border-b border-gray-400 rounded-b-lg shadow-lg"
                 style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}>
          </div>
        </div>
      </div>


      {/* Terminal Content (Post-Boot) */}
      <div className={`absolute top-0 left-0 w-full h-full p-4 overflow-auto transition-opacity duration-500 ease-in ${isPoweredOn ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden={!isPoweredOn}>
        <div className="max-w-4xl mx-auto">
          {isPoweredOn && isBooting && (
            <Welcome onFinished={handleBootFinished} />
          )}

          {!isBooting && (
            <>
              {history.map((entry, index) => (
                <div key={index}>
                  <div className="flex flex-wrap">
                    <span className="text-teal-400">roelofmol</span><span className="text-slate-400">@</span><span className="text-blue-400">portfolio</span><span className="text-slate-400">:</span><span className="text-yellow-400">~</span><span className="text-slate-400">$</span>
                    <span className="flex-1 ml-2">{entry.command}</span>
                  </div>
                  {entry.output && <div className="mt-1 mb-4">{entry.output}</div>}
                </div>
              ))}
              <div className="flex flex-wrap">
                {awaitingConfirmation ? (
                    <span className="text-teal-400">Confirm [Y/n]:</span>
                ) : (
                  <>
                    <span className="text-teal-400">roelofmol</span><span className="text-slate-400">@</span><span className="text-blue-400">portfolio</span><span className="text-slate-400">:</span><span className="text-yellow-400">~</span><span className="text-slate-400">$</span>
                  </>
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none text-green-400 w-full focus:outline-none ml-2"
                  autoFocus={isPoweredOn && !isBooting}
                  aria-label="Terminal command input"
                />
              </div>
            </>
          )}
          <div ref={endOfTerminalRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalApp;