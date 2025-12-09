import { PageHeader } from "@/layout/PageHeader";
import React from "react";
import { motion } from "framer-motion";
import { Outlet } from "react-router";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const Content = React.memo(() => {
  return (
    <div className="flex items-start justify-center w-full h-screen px-3 duration-1000">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center duration-1000 2xl:w-[70%] md:w-[100%] md:h-[92%] overflow-hidden w-full h-full p-2 mt-5 relative rounded-xl shadow-2xl dark:shadow-[0_0_10px_rgba(255,255,255,0.4)] bg-card"
      >
        <PageHeader />
        <ScrollArea className="h-full w-full rounded-md">
          <div className="h-[calc(100%-60px)] overflow-y-auto my-2 bg-cover rounded-xl hideScrollbar duration-1000 bg-[url('/dashboard-light.png')] dark:bg-[url('/dashboard-dark.png')]">
            <Outlet />
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
});
