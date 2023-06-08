import React from "react";

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-neutral-900 px-2 pt-28 md:px-4 lg:px-6">
      {children}
    </main>
  );
};

export default Body;
