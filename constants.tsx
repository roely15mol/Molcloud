import React from 'react';

// Navigation
export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certs', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

// Data
export const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/roely15mol' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/roelof-m-520931100' },
];

export const SKILLS_CATEGORIZED = [
    {
      title: "Cloud Platforms",
      skills: ["AWS", "Azure", "Kubernetes", "Docker"]
    },
    {
      title: "Infrastructure",
      skills: ["Terraform", "Ansible"]
    },
    {
      title: "Programming",
      skills: ["Python"]
    },
    {
      title: "DevOps",
      skills: ["CI/CD", "GitLab CI", "RunDeck"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Linux", "Monitoring", "Logging", "Security"]
    }
];

export const EXPERIENCE = [
    {
        role: 'Security and Compliance Manager',
        company: 'Solvinity',
        duration: 'Feb 2025 - Present',
        description: 'Overseeing security and compliance initiatives, ensuring adherence to industry standards and regulations, and managing risk assessments and mitigation strategies.'
    },
    {
        role: 'Cloud Engineer',
        company: 'Solvinity',
        duration: 'Jan 2020 - Present',
        description: 'Developed and maintained cloud infrastructure, implemented CI/CD pipelines, and collaborated with cross-functional teams.'
    }
];

export const EDUCATION = [
  {
    degree: "Bachelor's Degree in Cyber Security and Cloud",
    institution: "Hogeschool Utrecht",
    period: "2021-2025",
    achievements: [
      "Specialized in Cloud Computing and Distributed Systems",
      "Relevant coursework: Cloud Architecture, DevOps Practices, System Design",
      "Practical experience: Applied cybersecurity solutions and cloud migrations during dual work-study assignments"
    ]
  },
  {
    degree: "VWO Diploma",
    institution: "Jacobus Fruytier Scholengemeenschap",
    period: "2014-2020",
    achievements: [
        "Graduated with a focus on Nature and Technology / Nature and Health"
    ]
  }
];


export const CERTIFICATIONS = [
  {
    name: 'HashiCorp Certified: Terraform Associate (002)',
    url: 'https://www.credly.com/badges/74d3b72d-83cc-45d3-a480-673ac234ae3b',
    badgeId: '74d3b72d-83cc-45d3-a480-673ac234ae3b'
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    url: 'https://www.credly.com/badges/db3ec8ce-1e38-4ecd-8829-0eaa8515eea7',
    badgeId: 'db3ec8ce-1e38-4ecd-8829-0eaa8515eea7'
  }
];

// FIX: Add PROJECTS constant to resolve import error.
export const PROJECTS = [
  {
    title: 'Portfolio Website',
    description: 'This very website is selfhosted with docker and has an automated rollback function for when a deployment is not succesfull',
    tags: ['Docker', 'Automated'],
    link: 'https://github.com/roely15mol/molcloud'
  }
];