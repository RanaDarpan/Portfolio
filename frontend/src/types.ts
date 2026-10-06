export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  features: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialLink: string;
  description: string;
}

export interface PortfolioData {
  projects: Project[];
  certificates: Certificate[];
  filterTags?: string[];
}
