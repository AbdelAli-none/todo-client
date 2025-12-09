import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

export const ClockCard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="flex items-center h-full bg-gradient-to-r from-slate-700/75 to-slate-900/75 rounded-xl px-4 py-6 shadow shadow-primary">
      <Clock className="w-6 h-6 text-cyan-500 mr-3" />
      <span className="text-2xl md:text-3xl font-mono font-bold text-white">
        {hours}:{minutes}:{seconds}
      </span>
    </div>
  );
};
