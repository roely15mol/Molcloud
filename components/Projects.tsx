import React from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';

const Projects = () => {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.title} className="bg-[#161B22] rounded-lg p-6 border border-gray-700/50 flex flex-col transition-all duration-300 hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/10 transform hover:-translate-y-2">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 font-semibold mt-auto group">
              View Project <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;