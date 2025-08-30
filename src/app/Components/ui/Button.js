import React from "react";
import { useRouter } from "next/navigation";

const Button = ({ children, onClick, className = "", href }) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex h-14 w-full min-w-[84px] max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--color-primary)] px-5 text-base font-bold leading-normal tracking-[0.015em] text-gray-900 shadow-lg shadow-[var(--color-primary)]/20 transition-all hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${className}`}
    >
      <span className="truncate">{children}</span>
    </button>
  );
};

export default Button;
