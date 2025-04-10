import React, { useEffect, useState, SyntheticEvent } from "react";
import { ActiveViewEnum } from "./types";
import Char10x16 from "./Char10x16";
import Font from "./Font";


function Main()
{
  // Global State
  const [fontCharArray, setFontCharArray] = useState<number[]>([]);
  
  // Local State
  const [activeView, setActiveView] = useState<ActiveViewEnum>(ActiveViewEnum.FONT_TABLE);
  const [charToEditId, setCharToEditId] = useState<number>(0);
  const [charToEditPixelData, setCharToEditPixelData] = useState<number[]>([]);
  const [wasCharEdited, setWasCharEdited] = useState<boolean>(false);


  useEffect(() =>
  {
    const fontArray = Array((127-32) * 10 * (16/8)).fill(0) as number[];

    setFontCharArray(fontArray);

  }, []);


  const handleEditCharClick = (charId: number) =>
  {
    // charData = [ 0x03, 0x03, 0x03, 0x83, 0xC3, 0x63, 0x33, 0x1B, 0x0F, 0x07,
    //   0x60, 0xE0, 0xC0, 0xC1, 0xC1, 0xC1, 0xC3, 0xC3, 0xFF, 0x7E ];
    
    setWasCharEdited(false);
    setCharToEditId(charId);
    setActiveView(ActiveViewEnum.CHARACTER_EDITOR);
  }


  const handleApplyCharChanges = (pixelData: number[]) =>
  {
    console.log(fontCharArray);

    const fontCharArrayCopy = fontCharArray.slice(0, fontCharArray.length);

    for (let i = 0; i < 20; i++)
    {
      fontCharArrayCopy[(charToEditId-32)*20 + i] = pixelData[i];
    }

    console.log(fontCharArrayCopy);
    setFontCharArray(fontCharArrayCopy);

    setCharToEditPixelData(pixelData);
    setWasCharEdited(true);
    // console.log("handleApplyCharChanges (Main)");
    // console.log(pixelData);
  };

  const renderActiveView = (view: ActiveViewEnum) =>
  {
    if (view === ActiveViewEnum.FONT_TABLE)
    {
      return (
        <Font
          id={1}
          fontCharArray={fontCharArray}
          initialValues={null}
          // onEditCharClick={(charId, charData) => {
          //   console.log(`char to edit: ${charId}`);
          //   console.log(charData);
          // }}
          onEditCharClick={handleEditCharClick}
          editedChar={
            wasCharEdited ? { charId: charToEditId, charArray: charToEditPixelData} : null
          }
        />
      );
    }
    else if (view === ActiveViewEnum.CHARACTER_EDITOR)
    {
      return (
        <Char10x16
          id={charToEditId}
          // initialPixels={charToEditPixelData}
          initialPixels={fontCharArray.slice((charToEditId-32)*20, (charToEditId-32)*20+20)}
          onSaveButtonClick={(charId, pixelData) => handleApplyCharChanges(pixelData)}
          onGoBackButtonClick={() => setActiveView(ActiveViewEnum.FONT_TABLE)}
        />
      );
    }
    else
    {
      return (<p>ERROR - selected view was not recognized</p>);
    }
  };

  return (
    <div>
      <h1>Main Component</h1>
      {renderActiveView(activeView)}
    </div>

  );
}

export default Main;