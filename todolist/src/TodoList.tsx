import { useContext } from "react";
import { TodoContext } from "./TodoContextProvider";

const TodoList = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoList must be used within TodoContextProvider");
  }

  const { todoList } = context;

  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length === 0 ? (
        <p>No todos yet! Add one above.</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              {todo.completed ? <s>{todo.text}</s> : todo.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
