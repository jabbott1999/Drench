import Square from "./Square";
import Grid from "@mui/material/Grid";

function Board() {
  const size = 25;
  const grid = [];
  const colors = {
    0: "#EE6352",
    1: "#08B2E3",
    2: "#EFE9F4",
    3: "#57A773",
    4: "#484D6D",
    5: "#340068",
  };

  for (let row = 0; row < size; row++) {
    grid.push([]);

    for (let col = 0; col < size; col++) {
      const color = colors[Math.floor(Math.random() * 6)];
      grid[row].push(
        <Grid item xs={1}>
          <Square color={color} />
        </Grid>
      );
    }
  }

  return (
    <Grid container columns={size} spacing={0} width="600px" height="600px">
      {grid}
    </Grid>
  );
}

export default Board;
