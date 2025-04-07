import React, { useEffect, useState, SyntheticEvent } from "react";


interface IPixelProps
{
  id: number;
  shouldDisplayNumber: boolean;
  // onPixelClick: (pixelState: boolean) => void;
  onPixelClick: (pxId: number, pixelState: boolean) => void;
};

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
    // console.log(`byte #${0}; bit #${0}`);

    console.log(`pxId: ${pxId}; pixelState: ${pixelState}`);
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

    console.log(charArray);
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