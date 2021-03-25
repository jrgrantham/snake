const Grid = ({ width, height }) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="flex items-center justify-center w-screen h-screen bg-gray-400 "
    >
      <div className="text-5xl">
        {width} x {height}
      </div>
    </div>
  );
};

export default Grid;
