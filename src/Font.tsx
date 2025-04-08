import React, { useEffect, useState, SyntheticEvent } from "react";
import { IFontProps } from "./types";
import { convertByteToHexString } from "./utils";
import Char10x16 from "./Char10x16";


function Font({ id, initialValues, onEditCharClick }: IFontProps)
{
  const [characters, setCharacters] = useState<number[]>([]);

  useEffect(() =>
  {
    if (initialValues !== null)
    {
      // ...
    }

    setCharacters(Array((127-32) * 10 * (16/8)).fill(0) as number[]);

  }, []);

  const handleEditCharButtonClick = (ev: SyntheticEvent, charId: number) =>
  {
    ev.preventDefault();
    onEditCharClick(charId, characters.slice(charId-32, charId-32+20));
  };

  const generateFontTableUIRows = () =>
  {
    const rows: React.JSX.Element[] = [];

    let j = 0;
    for (let i = 32; i < 127; i++)
    {
      rows.push(
        <tr key={i}>
          <td>{ ++j }</td>
          {/* <td>{ i === 32 ? "\' \'" : String.fromCharCode(i) }</td> */}
          <td>{ i === 32 ? "[space]" : String.fromCharCode(i) }</td>
          <td>{ i }</td>
          <td>{ convertByteToHexString(i) }</td>
          <td>
            <button
              // onClick={ () => { console.log("edit button click"); }}
              onClick={ (ev) => handleEditCharButtonClick(ev, i)}
            >edit</button>
          </td>
        </tr>
      );
      
    }

    return rows;
  };
  
  return (
    <div className="font-table-wrapper">
      <button
        onClick={() => {
          console.log(`characters.length = ${characters.length}`);
          console.log(characters);
        }}
      >log chars</button>
      <table className="font-table">
        <thead>
          <tr>
            <th>char #</th>
            <th>char</th>
            <th>dec</th>
            <th>hex</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {generateFontTableUIRows()}
        </tbody>
      </table>
    </div>

  );
}

export default Font;