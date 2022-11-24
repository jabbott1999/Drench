import "./App.css";
import Board from "./Board";
import Palette from "./Palette";
import React, { useRef } from "react";

function App() {
  const colors = {
    0: "#EE6352",
    1: "#08B2E3",
    2: "#EFE9F4",
    3: "#57A773",
    4: "#484D6D",
    5: "#340068",
  };

  const childRef = useRef();

  const handleColorClick = (color) => {
    childRef.current.clickColor(color);
  };

  return (
    <div className="App">
      <Board colors={colors} ref={childRef} />
      <Palette colors={colors} handleColorClick={handleColorClick} />
    </div>
  );
}

export default App;
