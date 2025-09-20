import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { TaskProvider } from "./context/TaskContext.tsx";
import TaskDetails from "./pages/TaskDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:taskId", // 👈 param route
    element: <TaskDetails />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </StrictMode>
);
