import type { Column } from "./types";

export const dummyData: Column[] = [
  {
    id: "col-1",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Design landing page",
        description: "Create wireframes and mockups for the new landing page.",
        createdBy: "Alice",
        priority: "High",
        dueDate: "2025-09-25",
      },
      {
        id: "task-2",
        title: "Database schema",
        description: "Plan tables and relations for user accounts and tasks.",
        createdBy: "Bob",
        priority: "Medium",
        dueDate: "2025-09-22",
      },
      {
        id: "task-3",
        title: "Set up CI/CD",
        description:
          "Integrate GitHub Actions for automated testing and deployment.",
        createdBy: "Charlie",
        priority: "Low",
        dueDate: "2025-09-30",
      },
    ],
  },
  {
    id: "col-2",
    title: "In Progress",
    tasks: [
      {
        id: "task-4",
        title: "API Authentication",
        description: "Implement JWT-based authentication for the backend.",
        createdBy: "Diana",
        priority: "High",
        dueDate: "2025-09-21",
      },
      {
        id: "task-5",
        title: "Drag-and-drop feature",
        description:
          "Enable task reordering and column movement with react-beautiful-dnd.",
        createdBy: "Eve",
        priority: "High",
        dueDate: "2025-09-24",
      },
      {
        id: "task-6",
        title: "User profile page",
        description: "Build UI for viewing and editing user profiles.",
        createdBy: "Frank",
        priority: "Medium",
        dueDate: "2025-09-27",
      },
    ],
  },
  {
    id: "col-3",
    title: "Done",
    tasks: [
      {
        id: "task-7",
        title: "Project setup",
        description:
          "Initialize Next.js project with Tailwind and TanStack Query.",
        createdBy: "Grace",
        priority: "Low",
        dueDate: "2025-10-15",
      },
      {
        id: "task-8",
        title: "Login page",
        description: "Create login form with email & password validation.",
        createdBy: "Hank",
        priority: "Medium",
        dueDate: "2025-09-18",
      },
      {
        id: "task-9",
        title: "API Documentation",
        description: "Write OpenAPI docs for all backend routes.",
        createdBy: "Ivy",
        priority: "Low",
        dueDate: "2025-09-16",
      },
      {
        id: "task-10",
        title: "Team onboarding",
        description:
          "Prepare a README with project setup instructions for new members.",
        createdBy: "Jack",
        priority: "Medium",
        dueDate: "2025-09-17",
      },
    ],
  },
];
