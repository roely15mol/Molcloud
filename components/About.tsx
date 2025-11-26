import React from 'react';
import Section from './Section';

const About = () => {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-4xl mx-auto text-center text-base sm:text-lg text-gray-300 space-y-6 leading-relaxed">
        <p>
          As a Customer Cloud Engineer with a laser focus on private cloud solutions, I bridge the gap between complex infrastructure and seamless user experience. My passion lies in architecting robust, scalable, and highly efficient cloud environments that empower businesses to innovate without constraints.
        </p>
        <p>
          Leveraging deep expertise in Docker, I design and implement sophisticated CI/CD pipelines with GitLab to accelerate development cycles. I utilize Ansible for end-to-end automation and Python to script custom tooling, ensuring every component of the infrastructure is consistent, reliable, and maintainable. I am driven by my clients' success, translating their unique challenges into secure and performant cloud-native solutions that serve as a foundation for their growth.
        </p>
      </div>
    </Section>
  );
};

export default About;
