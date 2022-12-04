export interface IComment {
  user: string;
  time_ago: string;
  content: string;
  comments: IComment[];
}

export interface IStory {
  id: string;
  points: string;
  url: string;
  title: string;
  domain: string;
  type: string;
  time_ago: string;
  user: string;
  comments_count: number;
  comments: IComment[];
}

export interface Image {
  alternativeText?: string;
  caption?: string;
  created_at: string;
  ext: string;
  formats: Partial<FormatImage>
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
  size: number;
  updated_at: string;
  url: string;
  width: number;
}

interface FormatImage {
	ext: string;
	hash: string;
	height: number;
	mime: string;
  name: string;
  path: string;
  size: number;
  url: string;
  width: number;
}
