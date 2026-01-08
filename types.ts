
export enum PersonaType {
  CREATOR = 'Creator',
  BRAND = 'Brand',
  RECRUITER = 'Recruiter'
}

export interface UserImage {
  data: string;
  mimeType: string;
}

export interface UserInput {
  bio: string;
  username: string;
  posts: string[];
  images: UserImage[];
  desiredPerception: string;
  persona: PersonaType;
}

export interface ReflectionResult {
  observedSignals: string[];
  likelyInterpretation: string;
  possibleMisreadings: string;
  whatsMissing: string;
  intentVsPerception: {
    intent: string;
    perception: string;
  }[];
  smartSuggestions: string[];
  reflectionQuestion: string;
}
