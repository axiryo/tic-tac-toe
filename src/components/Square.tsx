type Props = {
  index: number;
  onClick(event: any): void;
  playerInput?: string;
};

const Square = ({ index, onClick, playerInput }: Props) => {
  const scale = playerInput ? "scale-100" : "scale-0";
  const textColor =
    playerInput === "X" ? "text-yellow-200" : "text-fuschia-300";
  const hoverStyle = "transition duration-500 hover:scale-105 transform";
  return (
    <div
      data-cell-index={index}
      className={`h-36 border-solid border-4 border-slate-200 text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
      {...{ onClick }}
    >
      <span
        data-cell-index={index}
        className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}
      >
        {playerInput}
      </span>
    </div>
  );
};

export default Square;
