export type Task = {
  id: number | string;
  text: string;
  completed: boolean;
  dueDate?: Date;
};
