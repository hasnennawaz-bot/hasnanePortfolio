export interface Contact {
  phone: string;
  email: string;
  website: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  contact: Contact;
}

export interface Education {
  degree: string;
  program: string;
  duration: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface WorkShowcaseItem {
  title: string;
  description: string;
  link: string;
}

export interface SocialMediaPage {
  pageName: string;
  profileLink: string;
}

export interface BeyondResumeItem {
  title: string;
  description: string;
}

export interface BeyondResume {
  title: string;
  items: BeyondResumeItem[];
}

export interface Metric {
  value: number;
  suffix: string;
  label: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  profileSummary: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  languages: Language[];
  workShowcase: WorkShowcaseItem[];
  socialMediaPagesManagerOf: SocialMediaPage[];
  beyondResume: BeyondResume;
  metrics: Metric[];
}
