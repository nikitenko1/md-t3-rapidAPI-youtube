import React from "react";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 top-0
    z-50 grid min-h-screen place-items-center bg-[#00000081]"
    >
      {children}
    </div>
  );
};

export default Backdrop;
