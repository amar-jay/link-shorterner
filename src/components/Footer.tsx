import * as React from "react";

interface IFooter {}

export const Footer: React.FC<IFooter> = () => {
  return (
    <footer className="bg-blue-600 h-[10vh] flex items-center justify-center flex-grow-0">
      <a
        href="https://github.com/amar-jay"
        className="text-center text-white decoration-none"
      >
        Built by Amar Jay 🤧
      </a>
    </footer>
  );
};
