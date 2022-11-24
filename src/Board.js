import Square from "./Square";
import Grid from "@mui/material/Grid";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

const Board = forwardRef((props, ref) => {
  const size = 6;

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

    // Set current solved squares to a color
    solvedSquares.forEach((s) => {
      newBoard[s.col][s.row] = createSquare(color);
    });

    // Add new solved squares
    solvedSquares.forEach((s) => {
      if (
        s.col + 1 < size &&
        getSquareColor(newBoard[s.col + 1][s.row]) === props.colors[color]
      ) {
        console.log("HELLO");
        setSolvedSquares([]);
        console.log(solvedSquares);
      }
    });

    return newBoard;
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
