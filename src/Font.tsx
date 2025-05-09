import React, { useEffect, useState, SyntheticEvent } from "react";
import { IFontProps } from "./types";
import { convertByteToHexString, charArrayToString } from "./utils";
import Char10x16 from "./Char10x16";


function Font({
  id, fontCharArray, initialValues, onEditCharClick, editedChar, onLoadFontFromJson
}: IFontProps)
{
  const [outputStr, setOutputStr] = useState<string>("");
  const [fontName, setFontName] = useState<string>("asciiFont1");

  useEffect(() =>
  {

  }, [editedChar]);

  const handleEditCharButtonClick = (ev: SyntheticEvent, charId: number) =>
  {
    ev.preventDefault();
    onEditCharClick(charId);
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

  const handleConvertToCArrrayString = (ev: SyntheticEvent) =>
  {
    ev.preventDefault();

    let outStr = `uint8_t fontName[] = {\n`
    
    for (let i = 32; i < 127; i++)
    {
      outStr += `    // \'${String.fromCharCode(i)}\'\n`;
      outStr += "    " + charArrayToString(fontCharArray.slice((i-32)*20, (i-32)*20+20), 10) + "\n";
    }

    outStr += "};"

    setOutputStr(outStr);
  };

  const handleConvertToJson = (ev: SyntheticEvent) =>
  {
    ev.preventDefault();

    const header = {
      name: fontName,
      size: "10x16"
    };

    setOutputStr(JSON.stringify({
      header: header,
      data: fontCharArray
    }));
  };

  const handleLoadFontFromJson = (ev: SyntheticEvent) =>
  {
    ev.preventDefault();

    // console.log(outputStr);

    onLoadFontFromJson(JSON.parse(outputStr).data as number[]);
  };

  
  return (
    <div className="font_main-wrapper">
      <div className="font-table-wrapper">
        <button
          onClick={() => {
            console.log(`characters.length = ${fontCharArray.length}`);
            console.log(fontCharArray);
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
      
      <div className="font_output-container">
        <button
          onClick={handleConvertToCArrrayString}
        >convert to C-like array</button>
        <button
          onClick={handleConvertToJson}
        >convert font to JSON</button>
        <button
          onClick={handleLoadFontFromJson}
        >load from JSON</button>
        <button
          onClick={ () => setOutputStr("") }
        >clear</button>
        <textarea
          cols={70}
          rows={50}
          value={outputStr}
          readOnly={false}
          onChange={(ev: SyntheticEvent) => setOutputStr((ev.target as HTMLInputElement).value)}
        ></textarea>
      </div>
    </div>

  );
}

export default Font;