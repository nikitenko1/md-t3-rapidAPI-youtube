import React from "react";

const Loader = ({ col }: { col: boolean }) => {
  return (
    <div className={`grid grid-cols-skeleton gap-4`}>
      {[...Array(100)].map((_, i) => (
        <div className="flex animate-pulse flex-col gap-y-3" key={i}>
          <div className={`flex ${col ? "flex-col" : "flex-row"} gap-4`}>
            <div className=" h-36 rounded-xl bg-gray-500"></div>
            <div className="space-y-2">
              <div className="h-6 w-full rounded-full bg-gray-500"></div>
              <div className="h-4 w-full rounded-full bg-gray-500"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
