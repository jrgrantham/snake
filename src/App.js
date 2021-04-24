import { useEffect, useRef, useState } from "react";

import { useDivSize } from "./useWindowSize";
import Snake from "./components/Snake/Snake";
import Toolbar from "./components/Toolbar/Toolbar";

const App = () => {
  const squareSize = 20;
  const borderSize = 200;

  const container = useRef(null);
  const divSize = useDivSize(container);
  const [squares, setNumberOfSquares] = useState({});

  const [score, setScore] = useState(0);

  useEffect(() => {
    const getMaximumGameGridSize = (divSize) => {
      const maximumGridDimension = Math.min(
        divSize.width - 2 * borderSize,
        divSize.height - 2 * borderSize
      );
      return maximumGridDimension;
    };

    const getMaximumNumberOfSquares = (maximumGameGridSize, squareSize) => {
      return Math.floor(maximumGameGridSize / squareSize);
    };

    const maximumGameGridSize = getMaximumGameGridSize(divSize);

    const gameGridSize = getMaximumNumberOfSquares(
      maximumGameGridSize,
      squareSize
    );

    const squares = {
      rows: gameGridSize,
      cols: gameGridSize,
    };

    setNumberOfSquares(squares);
  }, [divSize]);

  return (
    <div
      ref={container}
      className="flex flex-col justify-start items-center h-screen w-screen"
    >
      <Toolbar score={score} />
      {squares.rows && squares.cols ? <Snake squares={squares} /> : null}
    </div>
  );
};

export default App;
