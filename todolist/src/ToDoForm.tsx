import { useContext, useState } from "react";
import { TodoContext } from "./TodoContextProvider";

const ToDoForm = () => {
  const context = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");

  if (!context) {
    throw new Error("ToDoForm must be used within TodoContextProvider");
  }

  const { todoList, setTodoList, resetTodoList } = context;

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim()) {
      // Add new todo to the list
      const newTodo = {
        id: Date.now(), // Simple ID generation
        text: inputValue,
        completed: false,
      };
      setTodoList([...todoList, newTodo]);
      setInputValue(""); // Clear input
    }
  };

  return (
    <>
      <form className="form" onSubmit={onFormSubmit}>
        <label htmlFor="task">Task to do:</label>
        <input
          id="task"
          placeholder="Enter task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button onClick={resetTodoList}>Reset List</button>
      </form>
    </>
  );
};

export default ToDoForm;
