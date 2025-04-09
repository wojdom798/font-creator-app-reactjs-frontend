import React, { useEffect, useState, SyntheticEvent } from "react";
import { IChar10x16Props } from "./types";
import { convertByteToHexString, charArrayToString } from "./utils";
import Pixel from "./Pixel";


function Char10x16({
  id, initialPixels, onGoBackButtonClick, onSaveButtonClick
}: IChar10x16Props)
{
  const [charArray, setCharArray] = useState<number[]>([]);
  const [pixelNumbersActive, setPixelNumbersActive] = useState<boolean>(true);

  useEffect(() =>
  {
    // setCharArray(Array(10*(16/8)).fill(0) as number[]);
    setCharArray(initialPixels);
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
        const arrayPart = Math.floor((cellCount-1) / (10*8));
        const bytePos = (cellCount-1) % 10 + 10 * arrayPart;
        const bitPos = Math.floor((cellCount - 1 - (10*8)*(arrayPart)) / 10);

        if (i === 0 && j === 0)
        {
          console.log(`bytePos: ${bytePos}, bitPos: ${bitPos}`);
          console.log(charArray[bytePos] & (1 << bitPos));
        }

        currentRow.push(
          <Pixel
            key={cellCount}
            id={cellCount}
            shouldDisplayNumber={pixelNumbersActive}
            // onPixelClick={ (pxId: number, pixelState: boolean) => { console.log(`pixel ${pxId} clicked`) }}
            onPixelClick={handlePixelClick}
            initialValue={ (charArray[bytePos] & (1 << bitPos)) !== 0 ? true : false }
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


  const handleApplyChangesButtonClick = (ev: SyntheticEvent) =>
  {
    onSaveButtonClick(id, charArray);
  };

  return (
    <div className="table-wrapper-tmp">
    <h2>editing character: {id === 32 ? "[space]" : String.fromCharCode(id)}</h2>
    <button
      onClick={onGoBackButtonClick}
    >go back</button>
    <button
      onClick={handleApplyChangesButtonClick}
    >save</button>
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

export default Char10x16;