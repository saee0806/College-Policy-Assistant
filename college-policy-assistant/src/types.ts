export type Role = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: string;
  topicTag?: string;
  error?: boolean;
}

export interface PolicyTopic {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  officialNote: string;
  concernedDepartment: string;
  suggestedQuestions: string[];
}

export interface PolicyCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  topics: PolicyTopic[];
}

export interface DepartmentContact {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  officeLocation: string;
  officeHours: string;
}
