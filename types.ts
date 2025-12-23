
export type Genre = 'Fantasy' | 'Horror' | 'Romance' | 'Sci-Fi' | 'Mystery' | 'Adventure' | 'Comedy' | 'Inspirational';
export type Tone = 'Dark' | 'Funny' | 'Emotional' | 'Scary' | 'Hopeful' | 'Mysterious' | 'Inspirational';
export type StoryLength = 'Short' | 'Medium' | 'Long';

export interface StoryParams {
  genre: string;
  characterName: string;
  setting: string;
  tone: string;
  length: StoryLength;
}

export interface GeneratedStory {
  title: string;
  content: string;
  authorNote?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
