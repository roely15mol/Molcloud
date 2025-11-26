import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';

const Experience = () => {
  return (
    <Section id="experience" title="Work Experience">
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-2 border-gray-700">
          {EXPERIENCE.map((job, index) => (
            <div key={index} className="mb-10 ml-6 sm:ml-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-teal-900 rounded-full -left-4 ring-8 ring-[#0D1117]">
                <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
              </span>
              <div className="bg-[#161B22] p-4 sm:p-6 rounded-lg border border-gray-700/50 transition-all duration-300 hover:border-teal-500/50">
                <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                <p className="text-md text-teal-400 font-medium">{job.company}</p>
                <time className="block mb-4 text-sm font-normal leading-none text-gray-500">{job.duration}</time>
                <p className="text-base font-normal text-gray-400">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
