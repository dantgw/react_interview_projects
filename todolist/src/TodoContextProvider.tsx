import { createContext, useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoContextType = {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  resetTodoList: () => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const resetTodoList = () => {
    setTodoList([]);
  };

  return (
    <TodoContext.Provider value={{ todoList, setTodoList, resetTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};
