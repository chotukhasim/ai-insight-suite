import React from "react";

interface SpotlightProps {
  className?: string;
}

const InteractiveSpotlight: React.FC<SpotlightProps> = ({ className }) => {
  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden
      className={
        "pointer-events-none fixed inset-0 z-0 " + (className ?? "")
      }
      style={{
        background:
          "radial-gradient(600px circle at var(--x,50%) var(--y,50%), hsl(var(--brand) / 0.12), transparent 60%)",
        transition: "var(--transition-smooth)",
      }}
    />
  );
};

export default InteractiveSpotlight;
