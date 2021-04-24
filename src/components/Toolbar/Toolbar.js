const Toolbar = ({ score }) => {
  return (
    <div className="flex justify-center items-center justify-between w-screen h-32 bg-white text-5xl">
      <div>🐍</div>
      <div>{score}</div>
    </div>
  );
};

export default Toolbar;
