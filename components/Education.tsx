import React from 'react';
import Section from './Section';
import { EDUCATION } from '../constants';

const Education = () => {
  return (
    <Section id="education" title="Education">
      <div className="max-w-3xl mx-auto space-y-8">
        {EDUCATION.map((edu, index) => (
          <div key={index} className="bg-[#161B22] rounded-lg p-4 sm:p-6 border border-gray-700/50">
            <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
            <p className="text-md text-teal-400 mb-1 font-medium">{edu.institution}</p>
            <p className="text-sm text-gray-500 mb-4">{edu.period}</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {edu.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
