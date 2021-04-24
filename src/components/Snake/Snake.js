import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

import Grid from "../Grid/Grid";
import Infopanel from "../Debug/Infopanel";

const getRandomNumber = (n) => Math.floor(Math.random() * n);

const Snake = ({ squares }) => {
  const numberOfFoodItems = 10;
  const squareSize = 20;
  const intervalMilliseconds = 30;

  const interval = useRef(null);
  const [lost, setLost] = useState(false);
  const [board, setBoard] = useState();
  const [snakePosition, setSnakePosition] = useState([[0, 0]]);
  const [direction, setDirection] = useState([0, 1]);
  const [snakeLength, setSnakeLength] = useState();

  const addFoodToBoard = useCallback((board, n, foods = ["🍆", "🍏", "🍕"]) => {
    const newBoard = [...board];

    for (let i = 0; i < n; i++) {
      let randomRow = getRandomNumber(newBoard.length);
      let randomCol = getRandomNumber(newBoard[0].length);
      newBoard[randomRow][randomCol] = foods[getRandomNumber(foods.length)];
    }

    return newBoard;
  }, []);

  const addSnakeToBoard = (board) => {
    const newBoard = [...board];
    const row = Math.floor(board.length / 2);
    const col = Math.floor(board[0].length / 2);
    newBoard[row][col] = "snake";
    return newBoard;
  };

  const updateBoard = useCallback(
    (board) => {
      const newBoard = [...board];

      for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard.length; j++) {
          if (newBoard[i][j] === "snake") {
            newBoard[i][j] = "";
          }
        }
      }

      snakePosition.forEach(([x, y]) => {
        newBoard[x][y] = "snake";
      });

      return newBoard;
    },
    [snakePosition]
  );

  const restart = () => {
    setDirection([0, 1]);
    setSnakeLength(0);
    setBoard(getInitialBoard(squares, numberOfFoodItems));
  };

  const getInitialBoard = useCallback(
    (squares, numberOfFoodItems) => {
      const board = [...Array(squares.rows)].map(() =>
        [...Array(squares.cols)].map(() => "")
      );

      const boardWithFood = addFoodToBoard(board, numberOfFoodItems);

      const row = Math.floor(board.length / 2);
      const col = Math.floor(board[0].length / 2);
      const snakePosition = [[row, col]];
      setSnakePosition(snakePosition);
      const boardWithFoodAndSnake = addSnakeToBoard(boardWithFood);

      return boardWithFoodAndSnake;
    },
    [addFoodToBoard]
  );

  useLayoutEffect(() => {
    setBoard(getInitialBoard(squares, numberOfFoodItems));
  }, [getInitialBoard, squares]);

  useEffect(() => {
    const handler = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          setDirection([0, -1]);
          break;
        case "ArrowRight":
          setDirection([0, 1]);
          break;
        case "ArrowUp":
          setDirection([-1, 0]);
          break;
        case "ArrowDown":
          setDirection([1, 0]);
          break;
        case "Enter":
          if (lost) {
            restart();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [lost, restart]);

  useEffect(() => {
    const isOutOfBounds = (n) => {
      return n < 0 || n > squares.rows - 1;
    };

    interval.current = setTimeout(() => {
      const [x, y] = snakePosition[0];
      const [dx, dy] = direction;
      const newHead = [dx + x, dy + y];

      const newBoard = updateBoard(board);
      setBoard(newBoard);

      if (isOutOfBounds(newHead[0]) || isOutOfBounds(newHead[1])) {
        setLost(true);
        return;
      }

      let ateFood = false;
      if (["🍆", "🍏", "🍕"].includes(board[newHead[0]][newHead[1]])) {
        ateFood = true;
        const newBoard = addFoodToBoard(board, 1);
        setBoard(newBoard);
      }

      const snakeBody = snakePosition.slice(
        0,
        snakePosition.length - (ateFood ? 0 : 1)
      );

      if (snakeBody.some((x) => x[0] === newHead[0] && x[1] === newHead[1])) {
        setLost(true);
        return;
      }

      setSnakePosition([newHead, ...snakeBody]);
      setSnakeLength(snakeBody.length + 1);
    }, intervalMilliseconds);

    return () => {
      clearInterval(interval.current);
    };
  }, [
    squares,
    board,
    direction,
    snakePosition,
    lost,
    addFoodToBoard,
    updateBoard,
  ]);

  return (
    <div className="flex flex-col">
      <Grid board={board} gridSquareSize={squareSize} />
      <Infopanel
        snakePosition={snakePosition}
        snakeLength={snakeLength}
        interval={intervalMilliseconds}
        dimensions={{ rows: squares.rows, cols: squares.cols }}
      />
      {lost && <div className="text-xs text-red-500 font-bold">Lost</div>}
    </div>
  );
};

export default Snake;
