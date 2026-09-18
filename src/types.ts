export interface MemoryItem {
  id: string;
  category: string;
  title: string;
  date?: string;
  note: string;
  photoUrl?: string;
  caption?: string;
  tag?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    rohanResponse: string;
    isSpicy?: boolean;
  }[];
}

export interface IfYouWereItem {
  id: string;
  category: string;
  icon: string;
  rohanAnswer: string;
  explanation: string;
}

export interface GiftItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface DatabaseDiagnosis {
  nickname: string;
  detectionText: string;
  attribute1: string;
  attribute2: string;
  alertLevel: string;
  systemAction: string;
}

export interface RohsikaConfig {
  myName: string;
  herName: string;
  nicknames: string[];
  specialDate: string;
  favoriteSong: string;
  audioUrl?: string;
  memories: MemoryItem[];
  observations: {
    id: string;
    preview: string;
    content: string;
    annotation?: string;
  }[];
  ifYouWere: IfYouWereItem[];
  gifts: GiftItem[];
  quizQuestions: QuizQuestion[];
  databaseDiagnoses: DatabaseDiagnosis[];
}
