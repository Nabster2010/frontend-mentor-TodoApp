import Filters from "./Filters";
import TodoItem from "./TodoItem";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { Todo } from "../Types";
import { initialState } from "../data";
import FormInput from "./FormInput";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : initialState;
  });
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filter, setFilter] = useState<"All" | "Completed" | "Active">("All");
  const moveTodo = useCallback((dragIndex: number, hoverIndex: number) => {
    setTodos((prevTodos: Todo[]) =>
      update(prevTodos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevTodos[dragIndex] as Todo],
        ],
      })
    );
  }, []);
  const addTodo = (task: string): void => {
    setTodos((prev: Todo[]) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          task,
          completed: false,
        },
      ];
    });
  };
  function completeTask(id: number) {
    const newState = [
      ...todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      }),
    ];
    setTodos(newState);
  }
  const deleteTodo = (id: number) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };
  const activeTodos = todos.filter((todo) => !todo.completed);
  const filterList = (filter: string): void => {
    switch (filter) {
      case "Active":
        setFilteredTodos(activeTodos);
        break;
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  const clearCompleted = () => {
    setTodos(activeTodos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    filterList(filter);
  }, [filter, todos]);

  const renderTodo = useCallback(
    (
      todo: Todo,
      index: number,
      completeTask: (id: number) => void,
      deleteTodo: (id: number) => void
    ) => {
      return (
        <TodoItem
          key={todo.id}
          completeTask={completeTask}
          index={index}
          todo={todo}
          moveTodo={moveTodo}
          deleteTodo={deleteTodo}
        />
      );
    },
    []
  );

  return (
    <div className="max-w-md mx-auto px-4 -mt-20 space-y-4 ">
      <FormInput addTodo={addTodo} />
      <div>
        <DndProvider backend={HTML5Backend}>
          <TransitionGroup>
            {filteredTodos.map((todo, i) => {
              return (
                <CSSTransition key={todo.id} timeout={500} classNames="item">
                  {renderTodo(todo, i, completeTask, deleteTodo)}
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </DndProvider>
        {filteredTodos.length === 0 && (
          <div className="dark:bg-DGray6 text-center bg-white text-Gray4  py-3">
            There is no todos
          </div>
        )}
        <Filters
          setFilter={setFilter}
          filter={filter}
          activeTodos={activeTodos}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
};
export default TodoList;
