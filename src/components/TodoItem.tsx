import crossIcon from "../assets/icon-cross.svg";
import CheckBox from "./CheckBox";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { Todo } from "../Types";
import classNames from "classnames";

export const TodoTypes = "todo";

interface TodoItemProps {
  index: number;
  todo: Todo;
  moveTodo: (dragIndx: number, hoverIndx: number) => void;
  completeTask: (id: number) => void;
  deleteTodo: (id: number) => void;
}
interface DragItem {
  index: number;
  id: string;
  type: string;
}

const TodoItem = ({
  moveTodo,
  index,
  todo,
  completeTask,
  deleteTodo,
}: TodoItemProps) => {
  const { id, task, completed } = todo;
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: TodoTypes,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveTodo(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: TodoTypes,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));
  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={classNames(
        "py-4 group  border-b border-Gray2 dark:border-DGray5 px-4  bg-white dark:bg-DGray6 flex items-center gap-4",
        isDragging ? " opacity-0 cursor-grabbing " : "opacity-100 cursor-grab "
      )}
    >
      <CheckBox checked={completed} completeTask={() => completeTask(id)} />
      <h3
        className={classNames(
          "text-sm",
          completed && "text-Gray3 line-through dark:text-DGray4"
        )}
      >
        {task}
      </h3>
      <button
        onClick={() => deleteTodo(id)}
        className="ml-auto hidden group-hover:block"
      >
        <span className="sr-only">delete todo</span>
        <img src={crossIcon} alt="delete" />
      </button>
    </div>
  );
};
export default TodoItem;
