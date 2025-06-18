export interface Task {
  id: number;
  content: string;
  completed: boolean;
  reward: number;
}

export interface TaskManagerContract {
  createTask: (content: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getTasks: (id: number) => Promise<Task>;
  getTaskCount: () => Promise<number>;
  claimReward: (id: number) => Promise<void>;
} 