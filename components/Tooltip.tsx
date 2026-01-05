const Tooltip = ({ text }: { text: string }) => {
  return (
    <div
      className="
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2
        px-2 py-1 text-xs text-white bg-black rounded
        opacity-0 group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none whitespace-nowrap
    "
    >
      {text}
    </div>
  );
};

export default Tooltip;
