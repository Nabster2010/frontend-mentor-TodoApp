import classNames from "classnames";
import { Todo } from "../Types";
type FilterProps = {
  activeTodos: Todo[];
  setFilter: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
  filter: "All" | "Active" | "Completed";
  clearCompleted: () => void;
};

const Filters = ({
  setFilter,
  filter,
  clearCompleted,
  activeTodos,
}: FilterProps) => {
  const All = filter === "All";
  const Active = filter === "Active";
  const Completed = filter === "Completed";
  return (
    <div className="w-full py-2 text-xs px-4 bg-white dark:bg-DGray6 flex items-center justify-between">
      <p className="text-Gray4 dark:text-DGray4">
        {activeTodos.length} items left
      </p>
      <div className="flex items-center gap-3 font-medium ">
        <button
          onClick={() => setFilter("All")}
          className={classNames(
            "  hover:text-DGray6 dark:hover:text-DGray1 transition",
            All ? "text-primary" : "text-Gray4"
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Active")}
          className={classNames(
            "  hover:text-DGray6 dark:hover:text-DGray1 transition",
            Active ? "text-primary" : "text-Gray4"
          )}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={classNames(
            "  hover:text-DGray6 dark:hover:text-DGray1 transition",
            Completed ? "text-primary" : "text-Gray4"
          )}
        >
          Completed
        </button>
      </div>
      <button
        onClick={clearCompleted}
        className="text-Gray4 dark:text-DGray4 hover:text-DGray6 dark:hover:text-DGray1 transition"
      >
        Clear Completed
      </button>
    </div>
  );
};
export default Filters;
