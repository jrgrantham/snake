const Toolbar = ({ height, lives, score }) => {
  return (
    <div
      style={{ height: height }}
      className="flex flex-row items-center text-3xl bg-black text-white"
    >
      <div className="p-4">{score}</div>
      <div className="flex-grow p-4 font-bold text-center">Snake</div>
      <div className="p-4">{lives}</div>
    </div>
  );
};

export default Toolbar;
