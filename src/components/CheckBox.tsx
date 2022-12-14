import classnames from "classnames";
import checkIcon from "../assets/icon-check.svg";

type CheckBoxProps = {
  checked?: boolean;
  completeTask?: (id: number) => void;
};

const CheckBox = ({ checked = false, completeTask }: CheckBoxProps) => {
  return (
    <button
      onClick={completeTask}
      className={classnames(
        "w-[22px] h-[22px] cursor-pointer bg-Gray3 dark:bg-DGray5 rounded-full flex justify-center items-center transition ",
        checked
          ? "bg-gradient-to-br from-GradientFrom to-GradientTo"
          : "hover:bg-gradient-to-br hover:from-GradientFrom hover:to-GradientTo"
      )}
    >
      <div
        className={classnames(
          " w-[20px] h-[20px] rounded-full flex justify-center items-center ",
          checked ? "bg-transparent" : "bg-white dark:bg-DGray6"
        )}
      >
        {checked && <img src={checkIcon} alt="checkmark" />}
      </div>
    </button>
  );
};
export default CheckBox;
