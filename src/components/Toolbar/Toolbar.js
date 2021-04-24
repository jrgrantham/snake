const Toolbar = ({ score, width }) => {
  return (
    <div
      style={{ width: width }}
      className="flex justify-center items-center justify-between h-24 bg-white text-5xl"
    >
      <div>🐍</div>
      <div>{score}</div>
    </div>
  );
};

export default Toolbar;
