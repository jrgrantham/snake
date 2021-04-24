const Grid = ({ board, gridSquareSize }) => {
  const getRenderedBoard = (board) => {
    const border = 1;
    const rows = board.length;
    const cols = board[0].length;
    const width = cols * gridSquareSize + border * 2 + "px";
    const height = rows * gridSquareSize + border * 2 + "px";
    let content = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        content.push(
          <div
            className="flex items-center justify-center bg-white border border-black text-lg"
            style={{
              width: gridSquareSize,
              height: gridSquareSize,
              backgroundColor: board[i][j] === "snake" ? "green" : "white",
            }}
          >
            {board[i][j] === "snake" ? "" : board[i][j]}
          </div>
        );
      }
    }

    return (
      <div
        className="flex flex-wrap justify-start content-start border border-black my-2"
        style={{ width: width, height: height }}
      >
        {content ? content : null}
      </div>
    );
  };

  return <> {board ? getRenderedBoard(board) : null}</>;
};

export default Grid;
