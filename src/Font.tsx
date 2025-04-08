import React, { useEffect, useState, SyntheticEvent } from "react";
import { convertByteToHexString } from "./utils";
import Char10x16 from "./Char10x16";


function Font()
{

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
              onClick={ () => { console.log("edit button click"); }}
            >edit</button>
          </td>
        </tr>
      );
      
    }

    return rows;
  };
  
  return (
    <div className="font-table-wrapper">
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