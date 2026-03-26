import { motion } from "framer-motion";
import doneToDos from "src/assets/ok.png";

export const AllToDosCompleted = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 600 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "50%" }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden w-full h-full mt-auto"
    >
      <div className="flex flex-col justify-center items-center mt-[calc(50%-150px)]">
        <img className="w-[200px] block" src={doneToDos} />
        <p className="text-gray">🌟 You’re all caught up!</p>
      </div>
    </motion.div>
  );
};
