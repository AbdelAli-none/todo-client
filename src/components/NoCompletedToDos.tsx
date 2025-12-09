import { motion } from "framer-motion";
import NoCompletedToDos from "../Imgs/empty.png";

export const NoTasksCompletedIcon = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 600 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "50%" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center overflow-hidden"
    >
      <div className="flex flex-col justify-center items-center mt-[calc(50%-200px)]">
        <img className="w-[200px] h-fit mb-1 mt-4" src={NoCompletedToDos} />
        <p className="text-[#9f9b8b] dark:text-[#fffcf0]">
          You haven’t completed any tasks yet. Mark one as done to see progress!
        </p>
      </div>
    </motion.div>
  );
};
