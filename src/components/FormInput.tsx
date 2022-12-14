import { useRef, useState } from "react";
import CheckBox from "./CheckBox";

const FormInput = ({ addTodo }: { addTodo: (task: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value;
    if (!value) return;
    addTodo(value);
    inputRef.current.value = "";
    return;
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-12 rounded-md px-4  bg-white dark:bg-DGray6 flex items-center gap-4  "
    >
      <CheckBox />
      <input
        autoFocus
        ref={inputRef}
        type="text"
        placeholder="Create new todo..."
        className="caret-GradientFrom dark:bg-DGray6 flex-1 h-full block outline-none text-sm "
      />
    </form>
  );
};
export default FormInput;
