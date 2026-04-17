// CV Data for Uriel Akira Guardado Domingues

export interface ExperienceEntry {
  role: string;
  company: string;
  date: string;
  location: string;
}

export interface EducationEntry {
  degree: string;
  location: string;
  date: string;
  details: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export const personalInfo = {
  name: {
    first: "URIEL",
    last: "AKIRA"
  },
  title: "Graphic Designer & Creative",
  email: "arthurkayedesign@gmail.com",
  phone: "+351 933 306 456",
  location: "Braga, Portugal",
  behance: "behance.net/akirauriel",
  availability: "available for freelance",
  currentPosition: "currently @ boutik studio, braga",
  currentDate: "apr 2026–present"
} as const;

export const aboutText = `Junior designer with sharp eye for brand identity. Creating work that's visually distinct & meaningful to brands. Background in graphic design, marketing, photography & web.`;

export const rogueText = "(he actually means it)";

export const experience: ExperienceEntry[] = [
  {
    role: "Design Intern",
    company: "Boutik Studio",
    date: "Apr 2026–Present",
    location: "Braga, Portugal"
  },
  {
    role: "Designer & Marketing",
    company: "Sticky Sticks · Toastiamo · Il Centro",
    date: "Jan 2026",
    location: "Italy"
  },
  {
    role: "Designer & Marketing",
    company: "Real Tennis",
    date: "Summer 2025",
    location: "Portugal"
  },
  {
    role: "Photographer",
    company: "Omakase Restaurant",
    date: "2024",
    location: "Portugal"
  },
  {
    role: "Freelance Web Designer",
    company: "Independent",
    date: "2023–2025",
    location: ""
  }
];

export const tools = [
  "Figma",
  "Affinity Designer",
  "Affinity Photo",
  "Affinity Publisher",
  "Photomator",
  "Illustrator",
  "Photoshop"
] as const;

export const marqueeText = "BRAGA · PORTUGAL · AVAILABLE · ARTHURKAYEDESIGN@GMAIL.COM · +351 933 306 456 · BEHANCE.NET/AKIRAURIEL ·";

export const education: EducationEntry = {
  degree: "12th Grade — Professional Design Course",
  location: "Braga, Portugal",
  date: "Expected Jun 2026",
  details: "Studio internship at Boutik Studio"
};

export const achievements: Achievement[] = [
  {
    title: "Quadro de Mérito",
    description: "10th grade"
  }
];

export const contactContent = {
  preTitle: "— let's build something —",
  title: "GET IN TOUCH",
  email: "arthurkayedesign@gmail.com",
  phone: "+351 933 306 456",
  behance: "behance.net/akirauriel",
  location: "Braga, Portugal"
} as const;
