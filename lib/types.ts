export type Tag = 'pinned' | 'now' | 'work' | 'writing' | 'principles' | 'reading';

export interface Note {
  id: string;
  slug: string;
  title: string;
  content: string;
  tag: Tag;
  pinned: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotePreview extends Omit<Note, 'content'> {
  preview: string;
}
