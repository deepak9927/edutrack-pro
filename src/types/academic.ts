export interface Course {
  id: string;
  title: string;
}

export interface CourseWithProgress extends Course {
  progress: number;
  chapters: { id: string; title: string }[];
}