import React, { useEffect, useState, SyntheticEvent } from "react";
import { IPixelProps } from "./types";

function Pixel({ id, shouldDisplayNumber, onPixelClick }: IPixelProps)
{
  const [isActive, setIsActive] = useState<boolean>(false);

  const handlePixelClick = () =>
  {
    const currentPixelState = isActive;
    setIsActive(!isActive);
    onPixelClick(id, !currentPixelState);
  };

  return(
    <td
      onClick={handlePixelClick}
      className={ isActive ? "pixel--active" : "pixel"}
    >{shouldDisplayNumber ? String(id) : ""}</td>
  );
}

export default Pixel;