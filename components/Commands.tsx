import React, { useEffect, useRef } from 'react';
// FIX: Import PROJECTS to use in the new 'projects' command.
import { SKILLS_CATEGORIZED, EXPERIENCE, SOCIAL_LINKS, EDUCATION, CERTIFICATIONS, PROJECTS } from '../constants';
import { useTypingEffect } from '../hooks/useTypingEffect';

// A generic wrapper for command outputs that applies the typing effect
const CommandOutput: React.FC<{ text: string }> = ({ text }) => {
  const displayText = useTypingEffect(text, 5);
  return <pre className="whitespace-pre-wrap">{displayText}</pre>;
};

export const Help = () => {
  // FIX: Add 'projects' to the list of available commands.
  const text = `Available commands:
  - about:         Display professional summary.
  - skills:        List technical skills.
  - experience:    Show work experience.
  - projects:      Show featured projects.
  - education:     Show educational background.
  - certifications: View professional certifications.
  - social:        Show social media links.
  - contact:       Display contact information.
  - whoami:        Display user information.
  - cowsay <msg>:  Make a cow say something.
  - gui:           Switch to the graphical user interface.
  - matrix:        Enter the matrix.
  - all:           Display the full portfolio.
  - clear:         Clear the terminal screen.`;
  return <CommandOutput text={text} />;
};

export const About = () => {
  const text = `As a Customer Cloud Engineer with a laser focus on private cloud solutions, I bridge the gap between complex infrastructure and seamless user experience. My passion lies in architecting robust, scalable, and highly efficient cloud environments that empower businesses to innovate without constraints.

Leveraging deep expertise in Docker, I design and implement sophisticated CI/CD pipelines with GitLab to accelerate development cycles. I utilize Ansible for end-to-end automation and Python to script custom tooling, ensuring every component of the infrastructure is consistent, reliable, and maintainable. I am driven by my clients' success, translating their unique challenges into secure and performant cloud-native solutions that serve as a foundation for their growth.`;
  return <CommandOutput text={text} />;
};

export const Skills = () => {
  const text = `SKILLS & EXPERTISE\n-------------------\n\n` + SKILLS_CATEGORIZED.map(category => 
    `[ ${category.title} ]\n${category.skills.map(skill => `  - ${skill}`).join('\n')}`
  ).join('\n\n');
  return <CommandOutput text={text} />;
};

export const Experience = () => {
  const text = EXPERIENCE.map(job => 
    `ROLE:      ${job.role}\nCOMPANY:   ${job.company}\nDURATION:  ${job.duration}\nDETAILS:   ${job.description}\n`
  ).join('\n----------------------------------------\n');
  return <CommandOutput text={text} />;
};

// FIX: Add a 'Projects' command component for the terminal.
export const Projects = () => {
  const text = `FEATURED PROJECTS\n-----------------\n\n` + PROJECTS.map(p => 
    `TITLE:    ${p.title}\nDESC:     ${p.description}\nTAGS:     ${p.tags.join(', ')}\nLINK:     ${p.link}`
  ).join('\n\n');
  return <CommandOutput text={text} />;
};

export const Education = () => {
  const text = EDUCATION.map(edu => 
    `DEGREE:       ${edu.degree}\nINSTITUTION:  ${edu.institution}\nPERIOD:       ${edu.period}\nACHIEVEMENTS:\n${edu.achievements.map(a => `  - ${a}`).join('\n')}\n`
  ).join('\n----------------------------------------\n');
  return <CommandOutput text={text} />;
};

export const Certifications = () => {
  return (
    <div>
      {CERTIFICATIONS.map(cert => (
        <div key={cert.name} className="mb-2">
            <p className="text-slate-100 font-bold">{cert.name}</p>
            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 underline hover:text-teal-300">
                {cert.url}
            </a>
        </div>
      ))}
    </div>
  );
};

export const Social = () => {
  return (
    <div>
      {SOCIAL_LINKS.map(social => (
        <div key={social.name} className="flex items-center">
            <span className="w-24">{social.name}:</span>
            <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 underline hover:text-teal-300">
                {social.url}
            </a>
        </div>
      ))}
    </div>
  );
};

export const Contact = () => {
  const text = `You can reach me at:`;
  const displayText = useTypingEffect(text, 10);

  return (
    <div>
        <p>{displayText}</p>
        <a href="mailto:roelof@molcloud.net" className="text-teal-400 underline hover:text-teal-300">
            roelof@molcloud.net
        </a>
    </div>
  );
};

export const Whoami = () => {
  const text = `
    <span class="text-teal-400">roelofmol@portfolio</span>
    ---------------------
    <span class="text-white">OS:</span> MolOS (Web-Based)
    <span class="text-white">Shell:</span> term.js
    <span class="text-white">Title:</span> Customer Cloud Engineer
    <span class="text-white">Focus:</span> Private Cloud, Automation
    
    <span class="text-white">Core Skills:</span>
     - Docker
     - Kubernetes
     - Ansible
     - GitLab CI
     - Python
     - Terraform

    <span class="text-white">Contact:</span> roelof@molcloud.net
  `;

  // Simple parser to convert spans to styled spans
  const createMarkup = () => {
    const html = text
      .replace(/<span class="text-teal-400">/g, '<span style="color: #2dd4bf;">')
      .replace(/<span class="text-white">/g, '<span style="color: #e2e8f0;">');
    return { __html: html };
  };

  return <pre className="whitespace-pre-wrap" dangerouslySetInnerHTML={createMarkup()} />;
};

export const Cowsay: React.FC<{ message: string }> = ({ message }) => {
  const generateBubble = (msg: string) => {
    const lines = msg.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    const top = ' ' + '_'.repeat(maxLength + 2);
    const bottom = ' ' + '-'.repeat(maxLength + 2);

    const content = lines.map(line => {
      const padding = ' '.repeat(maxLength - line.length);
      if (lines.length === 1) {
        return `< ${line}${padding} >`;
      }
      if (line === lines[0]) {
        return `/ ${line}${padding} \\`;
      }
      if (line === lines[lines.length - 1]) {
        return `\\ ${line}${padding} /`;
      }
      return `| ${line}${padding} |`;
    }).join('\n');

    return `${top}\n${content}\n${bottom}`;
  };

  const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
  `;
  const fullText = `${generateBubble(message)}\n${cow}`;
  return <pre className="whitespace-pre-wrap">{fullText}</pre>
}

export const GuiConfirmation = () => {
  return (
    <pre className="whitespace-pre-wrap">
      Are you sure you want to leave the terminal?
      <br />
      It's a shame, but the GUI version is also cool.
    </pre>
  );
};

export const Matrix: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);
    
    const handleResize = () => {
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      onExit();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onExit]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black">
      <canvas ref={canvasRef}></canvas>
      <p className="absolute bottom-4 left-4 text-white/30 text-xs animate-pulse">Press any key to exit Matrix mode.</p>
    </div>
  );
};

export const NotFound: React.FC<{ command: string }> = ({ command }) => {
    const text = `bash: command not found: ${command}\nType 'help' for a list of available commands.`;
    return <CommandOutput text={text} />;
};