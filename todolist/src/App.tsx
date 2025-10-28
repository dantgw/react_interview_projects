import "./App.css";
import ToDoForm from "./ToDoForm";
import TodoList from "./TodoList";
import { TodoContextProvider } from "./TodoContextProvider";

function ToDoApp() {
  return (
    <TodoContextProvider>
      <main className="page">
        <section className="section">
          <ToDoForm />
        </section>
        <section className="section">
          <TodoList />
        </section>
      </main>
    </TodoContextProvider>
  );
}

export default ToDoApp;
