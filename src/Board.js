import Square from "./Square";
import Grid from "@mui/material/Grid";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

const Board = forwardRef((props, ref) => {
  const size = 25;

  const [board, setBoard] = useState();
  const [solvedSquares, setSolvedSquares] = useState([{ col: 0, row: 0 }]);

  useEffect(() => {
    setBoard(getInitialBoard());
  }, []);

  useImperativeHandle(ref, () => ({
    clickColor(color) {
      setBoard(updateBoard(color));
    },
  }));

  const updateBoard = (color) => {
    console.log(solvedSquares);
    const newBoard = [];
    board.forEach((row) => newBoard.push([...row]));

    const newSolvedSquares = [...solvedSquares];

    // Set current solved squares to a color
    newSolvedSquares.forEach((s) => {
      newBoard[s.col][s.row] = createSquare(color);
    });

    const newColor = props.colors[color];

    // Add new solved squares
    newSolvedSquares.forEach((square) =>
      updateLocalSolvedSquares(square, newBoard, newSolvedSquares, newColor)
    );

    return newBoard;
  };

  const updateLocalSolvedSquares = (
    s,
    newBoard,
    newSolvedSquares,
    newColor
  ) => {
    if (
      s.col + 1 < size &&
      isSquareSolved(newSolvedSquares, s.col + 1, s.row) &&
      getSquareColor(newBoard[s.col + 1][s.row]) === newColor
    ) {
      const newSquare = addSolvedSquare(newSolvedSquares, s.col + 1, s.row);
      updateLocalSolvedSquares(newSquare, newBoard, newSolvedSquares, newColor);
    }

    if (
      s.row + 1 < size &&
      isSquareSolved(newSolvedSquares, s.col, s.row + 1) &&
      getSquareColor(newBoard[s.col][s.row + 1]) === newColor
    ) {
      const newSquare = addSolvedSquare(newSolvedSquares, s.col, s.row + 1);
      updateLocalSolvedSquares(newSquare, newBoard, newSolvedSquares, newColor);
    }

    if (
      s.col - 1 > -1 &&
      isSquareSolved(newSolvedSquares, s.col - 1, s.row) &&
      getSquareColor(newBoard[s.col - 1][s.row]) === newColor
    ) {
      const newSquare = addSolvedSquare(newSolvedSquares, s.col - 1, s.row);
      updateLocalSolvedSquares(newSquare, newBoard, newSolvedSquares, newColor);
    }

    if (
      s.row - 1 > -1 &&
      isSquareSolved(newSolvedSquares, s.col, s.row - 1) &&
      getSquareColor(newBoard[s.col][s.row - 1]) === newColor
    ) {
      const newSquare = addSolvedSquare(newSolvedSquares, s.col, s.row - 1);
      updateLocalSolvedSquares(newSquare, newBoard, newSolvedSquares, newColor);
    }

    setSolvedSquares(newSolvedSquares);
  };

  const isSquareSolved = (solvedSquares, col, row) => {
    return !solvedSquares.find((s) => s.row === row && s.col === col);
  };

  const addSolvedSquare = (solvedSquares, col, row) => {
    if (isSquareSolved(solvedSquares, col, row)) {
      solvedSquares.push({ col, row });
    }

    return { col, row };
  };

  const createSquare = (color) => {
    return (
      <Grid item xs={1}>
        <Square color={props.colors[color]} />
      </Grid>
    );
  };

  const getSquareColor = (square) => {
    return square.props.children.props.color;
  };

  const getInitialBoard = () => {
    let grid = [];

    for (let row = 0; row < size; row++) {
      grid.push([]);

      for (let col = 0; col < size; col++) {
        const color = props.colors[Math.floor(Math.random() * 6)];
        grid[row].push(
          <Grid item xs={1}>
            <Square color={color} />
          </Grid>
        );
      }
    }

    return grid;
  };

  return (
    <Grid container columns={size} spacing={0} width="600px" height="600px">
      {board}
    </Grid>
  );
});

export default Board;
