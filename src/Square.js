import Box from "@mui/material/Box";

function Square(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: props.color,
        display: "inline-block",
      }}
    ></Box>
  );
}

export default Square;
