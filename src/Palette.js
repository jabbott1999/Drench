import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

function Palette(props) {
  const size = 6;
  const pallete = [];

  for (let col = 0; col < size; col++) {
    pallete.push(
      <Grid item xs={1}>
        <Button
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: props.colors[col],
          }}
          onClick={() => props.handleColorClick(col)}
        />
      </Grid>
    );
  }

  return (
    <Grid
      container
      columns={6}
      spacing={0}
      width="600px"
      height="110px"
      backgroundColor="#A4A5A7"
      padding="15px 10px 10px 10px"
      borderRadius="5px"
      marginTop="20px"
    >
      {pallete}
    </Grid>
  );
}

export default Palette;
