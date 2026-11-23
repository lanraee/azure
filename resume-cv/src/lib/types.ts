export type SkillGroup = {
  id: string;
  name: string;
  items: string[];
};

export type ExperienceEntry = {
  id: string;
  title: string;
  org: string;
  date: string;
  subtitle: string;
  bullets: string[];
  hidden: boolean;
  simulation: boolean;
  order: number;
};

export type Content = {
  profile: {
    name: string;
    tagline: string;
    email: string;
    location: string;
    licence: string;
    profileText: string;
  };
  skills: SkillGroup[];
  certsInProgress: string[];
  certifications: string[];
  experience: ExperienceEntry[];
};
