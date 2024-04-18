export interface ITask {
    id: number;
    name: string;
    description: string;
    status: "todo" | "doing" | "done";
    dueDate: Date;
}