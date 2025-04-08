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

function Char10x16()
{
  const [charArray, setCharArray] = useState<number[]>([]);
  const [pixelNumbersActive, setPixelNumbersActive] = useState<boolean>(true);

  useEffect(() =>
  {
    setCharArray(Array(10*(16/8)).fill(0) as number[]);
  }, []);


  const handlePixelClick = (pxId: number, pixelState: boolean) =>
  {
    // console.log(`pxId: ${pxId}; pixelState: ${pixelState}`);

    const arrayPart = Math.floor((pxId-1) / (10*8));
    const bytePos = (pxId-1) % 10 + 10 * arrayPart;
    const bitPos = Math.floor((pxId - 1 - (10*8)*(arrayPart)) / 10);

    // console.log(`byte #${bytePos}; bit #${bitPos}`);

    setCharArray(charArray.map((byte: number, index: number) =>
    {
      if (bytePos === index)
      {
        if (pixelState === false)
        {
          return (byte & ~(1 << bitPos));
        }
        return (byte | (1 << bitPos));
      }

      return byte;
    }));
  }

  const generateTable = () =>
  {
    const rows = [];
    
    let currentRow = [];
    let cellCount = 1;

    for (let i = 0; i < 16; i++)
    {
      for (let j = 0; j < 10; j++)
      {
        currentRow.push(
          <Pixel
            key={cellCount}
            id={cellCount}
            shouldDisplayNumber={pixelNumbersActive}
            // onPixelClick={ (pxId: number, pixelState: boolean) => { console.log(`pixel ${pxId} clicked`) }}
            onPixelClick={handlePixelClick}
          />
        );
        cellCount++;
      }
      rows.push(<tr key={i}>{currentRow}</tr>);
      currentRow = [];
    }

    return (
      <React.Fragment>
      {rows}
      </React.Fragment>
    );
  }

  const logCharArrayToConsole = (ev: SyntheticEvent) =>
  {
    ev.preventDefault();

    // console.log(charArray);
    console.log(charArrayToString(charArray));
  };

  const convertByteToHexString = (byte: number): string =>
  {
    if (byte < 0)
    {
      byte = 0;
    }

    const hexStr = (byte & 0xFF).toString(16).toUpperCase();

    if (byte < 16)
    {
      return "0x0" + hexStr;
    }
    return "0x" + hexStr
  };

  const charArrayToString = (charArray: number[]): string =>
  {
    let retStr = "{ ";
    let i: number;

    for (i = 0; i < charArray.length - 1; i++)
    {
      retStr += convertByteToHexString(charArray[i]) + ", ";
    }
    retStr += convertByteToHexString(charArray[i]) + " };";

    return retStr;
  };

  return (
    <div className="table-wrapper-tmp">
    <div className="button-container">
      <button
        onClick={ () => setPixelNumbersActive(!pixelNumbersActive) }
      >toggle pixel numbering</button>
      <button
        onClick={logCharArrayToConsole}
      >log char array to console</button>
    </div>
    <table className="character10x16-table">
      <tbody>
        {generateTable()}
      </tbody>
    </table>
    </div>
  );
}

function Main()
{
  return (
    <div>
      <h1>Main Component</h1>
      <Char10x16 />
    </div>

  );
}

export default Main;